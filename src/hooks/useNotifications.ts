
import { useState, useEffect } from 'react';
import { notificationService, Notification } from '@/services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await notificationService.initialize();
        setNotifications(notificationService.getNotifications());
        setUnreadCount(notificationService.getUnreadCount());
      } catch (error) {
        console.error('Error initializing notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeNotifications();

    // S'abonner aux mises à jour
    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
      setUnreadCount(notificationService.getUnreadCount());
    });

    return unsubscribe;
  }, []);

  const markAsRead = async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    await Promise.all(
      unreadNotifications.map(n => notificationService.markAsRead(n.id))
    );
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead
  };
};
