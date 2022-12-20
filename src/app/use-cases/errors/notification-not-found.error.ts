export class NotificationNotFound extends Error {
  constructor(id: string) {
    super(`Notification with id ${id} not found`);
  }
}
