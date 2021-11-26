import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

export const postNotification = async (data: string, type: string): Promise<Notification> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ data, type }),
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const notification = data.success.notification;
      return notification;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
