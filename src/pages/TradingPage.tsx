
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { MarketChart } from "@/components/MarketChart";
import { MultiAgentBetting } from "@/components/MultiAgentBetting";
import { AgentConfigurator } from "@/components/AgentConfigurator";

const TradingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-xl md:text-2xl font-bold truncate">Trading</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MarketChart />
            </div>
            <div>
              <AgentConfigurator />
            </div>
          </div>
          
          <MultiAgentBetting />
        </div>
      </main>
    </div>
  );
};

export default TradingPage;
