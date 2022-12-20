import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const persistentNotificationData =
      PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.create({
      data: persistentNotificationData,
    });
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
    const deletedNotification = await this.prisma.notification.delete({
      where: { id },
    });

    return deletedNotification.id;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toEntity(notification);
  }

  async save(notification: Notification): Promise<void> {
    const persistentNotificationData =
      PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.update({
      where: { id: notification.id },
      data: persistentNotificationData,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toEntity);
  }

  async readNotification(id: string): Promise<void> {
    const notification = await this.prisma.notification.findFirst({
      where: { id },
    });

    if (!notification) {
      return;
    }

    await this.prisma.notification.update({
      where: { id: notification.id },
      data: { ...notification, readAt: new Date() },
    });
  }
}
