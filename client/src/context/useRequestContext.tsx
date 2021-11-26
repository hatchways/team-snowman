import requestData from '../interface/Request';
import { fetchRequests, updateRequest } from '../helpers/APICalls/request';
import { useSocket } from './useSocketContext';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';
import { useNotification } from './useNotificationContext';

interface IRequestContext {
  requests: requestData | null | undefined;
  sendResponse: (bookingStatus: string, requestId: string, ownerId: string) => void;
}

export const RequestContext = createContext<IRequestContext>({
  requests: null,
  sendResponse: () => null,
});

export const RequestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [requests, updateRequests] = useState<requestData | null | undefined>();
  const { emitNotification } = useSocket();
  const { sendNewNotification } = useNotification();
  useEffect(() => {
    const getRequests = async () => {
      const fetchedRequests = await fetchRequests();
      updateRequests(fetchedRequests);
    };
    getRequests();
  }, []);

  const sendResponse = async (bookingStatus: string, requestId: string, ownerId: string) => {
    const updated = await updateRequest(bookingStatus, requestId);
    sendNewNotification(requestId, 'requestUpdate');
    updateRequests(updated);
    emitNotification(ownerId);
  };

  return <RequestContext.Provider value={{ requests, sendResponse }}>{children}</RequestContext.Provider>;
};

export function useRequest(): IRequestContext {
  return useContext(RequestContext);
}
