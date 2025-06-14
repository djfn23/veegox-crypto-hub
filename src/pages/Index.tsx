
import React from "react";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";

// Import direct sans lazy loading pour éviter les problèmes d'export
import ComprehensiveDashboard from "@/components/ComprehensiveDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ComprehensiveDashboard />
      
      {/* Widgets supplémentaires */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActionsWidget />
          <RecentActivityWidget />
        </div>
      </div>
    </div>
  );
};

export default Index;
