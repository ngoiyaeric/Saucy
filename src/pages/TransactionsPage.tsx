
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentActivity } from "@/components/RecentActivity";
import { ChatBot } from "@/components/ChatBot";

const TransactionsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          
          <RecentActivity />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChatBot 
              title="Transaction Assistant" 
              variant="compact" 
              assistantName="Tx Helper"
            />
            <ChatBot 
              title="Fee Optimizer" 
              variant="compact"
              assistantName="Fee Bot"
            />
            <ChatBot 
              title="Portfolio Advisor" 
              variant="compact"
              assistantName="Portfolio AI"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionsPage;
