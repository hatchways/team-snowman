import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuthContext';
import { useNotification } from './useNotificationContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  emitNotification: (userId: string) => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  emitNotification: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser } = useAuth();
  const { getNewNotifications } = useNotification();
  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      initSocket();
    }
  }, [loggedInUser, initSocket]);

  const emitNotification = (userId: string) => {
    socket?.emit('sendNotification', userId);
  };

  if (socket) {
    socket.on('connect', () => {
      console.log('Socket Connection Initialized');
      socket.emit('goOnline', loggedInUser ? loggedInUser : undefined);
    });
    socket.on('newNotification', () => {
      getNewNotifications();
    });
  } else {
    console.error('Socket Connection Failed');
  }

  return <SocketContext.Provider value={{ socket, initSocket, emitNotification }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
