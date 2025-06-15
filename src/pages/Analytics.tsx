
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { RealTimeMarketData } from "@/components/analytics/RealTimeMarketData";

const Analytics = () => (
  <AppLayout>
    <div className="container py-8">
      <RealTimeMarketData />
    </div>
  </AppLayout>
);

export default Analytics;
