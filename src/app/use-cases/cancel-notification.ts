import { Injectable } from '@nestjs/common';
// import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';

export interface CancelNotificationRequest {
  id: string;
}

export interface CancelNotificationResponse {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFound(id);
    }

    notification.cancel();

    return { notificationId: notification.id || '' };
  }
}
