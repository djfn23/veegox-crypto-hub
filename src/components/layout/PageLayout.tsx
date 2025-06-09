
import { ReactNode } from "react";
import { AppLayout } from "./AppLayout";
import { PageHeader } from "./PageHeader";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export const PageLayout = ({ title, subtitle, icon, children, actions }: PageLayoutProps) => {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-6">
        <PageHeader title={title} subtitle={subtitle} icon={icon} actions={actions} />
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </AppLayout>
  );
};
