import { Notification } from '../interface/Notification';
import { fetchNotifications } from '../helpers/APICalls/getNotifications';
import { updateNotifications } from '../helpers/APICalls/updateNotifications';
import { postNotification } from '../helpers/APICalls/postnotification';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface NotificationContext {
  notifications: [Notification] | null | undefined;
  markNotificationsAsRead: () => void;
  getNewNotifications: () => void;
  sendNewNotification: (id: string, type: string) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: null,
  markNotificationsAsRead: () => null,
  getNewNotifications: () => null,
  sendNewNotification: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, SetNotifications] = useState<[Notification] | null | undefined>();

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      SetNotifications(fetchedNotifications);
    };
    getNotifications();
  }, []);

  const markNotificationsAsRead = async () => {
    const updated = await updateNotifications();
    SetNotifications(updated);
  };

  const getNewNotifications = async () => {
    const fetchedNotifications = await fetchNotifications();
    SetNotifications(fetchedNotifications);
  };

  const sendNewNotification = (id: string, type: string) => {
    postNotification(id, type);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markNotificationsAsRead, getNewNotifications, sendNewNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification(): NotificationContext {
  return useContext(NotificationContext);
}
