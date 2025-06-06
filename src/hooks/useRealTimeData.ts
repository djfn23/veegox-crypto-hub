
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useRealTimeData = <T>(
  tableName: string,
  queryKey: string[],
  initialData?: T[]
) => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          // Invalidate and refetch the query
          queryClient.invalidateQueries({ queryKey });
          
          // Show notification for certain events
          if (payload.eventType === 'INSERT') {
            toast.info('Nouvelles données disponibles');
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        if (status === 'CLOSED') {
          toast.error('Connexion temps réel fermée');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, queryKey, queryClient]);

  return { isConnected };
};

export const useRealTimeNotifications = (userId: string | null) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user-notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new;
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show toast notification
          toast.info(newNotification.title, {
            description: newNotification.message,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { notifications };
};
