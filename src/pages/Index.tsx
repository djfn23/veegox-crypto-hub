
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";
import ComprehensiveDashboard from "@/components/ComprehensiveDashboard";

const Index = () => {
  return (
    <AppLayout>
      <ComprehensiveDashboard />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActionsWidget />
          <RecentActivityWidget />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
