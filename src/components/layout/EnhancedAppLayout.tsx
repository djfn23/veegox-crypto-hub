
import React from 'react';
import { AppLayout } from './AppLayout';
import { NotificationSystem } from '@/components/ui/notification-system';
import { GlobalSearch } from '@/components/ui/global-search';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/store/useAppStore';

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
}

export const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({ children }) => {
  useTheme(); // Initialize theme management
  const { notifications } = useAppStore();

  return (
    <>
      <AppLayout>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Breadcrumbs />
            <GlobalSearch />
          </div>
          {children}
        </div>
      </AppLayout>
      <NotificationSystem />
    </>
  );
};
