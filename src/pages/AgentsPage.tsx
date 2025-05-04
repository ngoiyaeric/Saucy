
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AgentConfigurator } from "@/components/AgentConfigurator";
import { RecentActivity } from "@/components/RecentActivity";
import { MultiAgentBetting } from "@/components/MultiAgentBetting";

const AgentsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">AI Agents</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MultiAgentBetting />
            </div>
            <div>
              <AgentConfigurator />
            </div>
          </div>
          
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default AgentsPage;
