export type UserNotification = {
  id: string;
  title: string;
  message: string;
  type: string;
  priority?: string;
  status?: string;
  read: boolean;
  createdAt: Date;
};
