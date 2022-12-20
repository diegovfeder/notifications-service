import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';

export interface ReadNotificationRequest {
  id: string;
}

export interface ReadNotificationResponse {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFound(id);
    }

    notification.read();

    return { notificationId: notification.id || '' };
  }
}
