
import React from "react";
import { QuickActionsWidget } from "@/components/dashboard/QuickActionsWidget";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";

// Import direct du composant
const ComprehensiveDashboard = React.lazy(() => 
  import("@/components/ComprehensiveDashboard").then(module => ({
    default: module.default
  }))
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-lg">Chargement...</div>
        </div>
      }>
        <ComprehensiveDashboard />
      </React.Suspense>
      
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
