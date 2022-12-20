import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { NotificationNotFound } from '@app/use-cases/errors/notification-not-found.error';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async cancel(id: string): Promise<{ notificationId: string } | null> {
    const notification = await this.findById(id);

    if (!notification) {
      return null;
    }

    notification.cancel;
    return {
      notificationId: notification.id,
    };
  }

  async delete(id: string): Promise<string | null> {
    const notificationIndex = this.notifications.findIndex((n) => n.id === id);

    if (notificationIndex === -1) {
      return null;
    }

    this.notifications.splice(notificationIndex, 1);

    return id;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((n) => n.id === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (n) => n.id === notification.id,
    );

    if (notificationIndex === -1) {
      throw new NotificationNotFound(notification.id);
    }

    this.notifications[notificationIndex] = notification;
  }

  public notifications: Notification[] = [];

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }

  async readNotification(id: string): Promise<void> {
    const notification = this.notifications.filter((n) => n.id === id);

    notification.forEach((n) => n.read());
  }
}
