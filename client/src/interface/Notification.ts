export interface Notification {
  _id: string;
  userId: string;
  type: string;
  updatedAt: string;
  read: string;
  data: { date: string; duration: number; firstName: string; photo: string; requestId: string };
}
