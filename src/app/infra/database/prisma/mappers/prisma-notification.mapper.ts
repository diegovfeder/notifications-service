import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/notification.content';

export class PrismaNotificationMapper {
  static toPersistence(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toEntity(notification: PrismaNotification) {
    return new Notification(
      {
        recipientId: notification.recipientId,
        content: new Content(notification.content),
        category: notification.category,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }
}
