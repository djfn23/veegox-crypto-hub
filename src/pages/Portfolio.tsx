
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PortfolioCard } from "@/components/modules/exchange/PortfolioCard";

const Portfolio = () => (
  <AppLayout>
    <div className="container py-8">
      <PortfolioCard />
    </div>
  </AppLayout>
);

export default Portfolio;
