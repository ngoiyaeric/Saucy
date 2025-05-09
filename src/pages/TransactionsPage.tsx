
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentActivity } from "@/components/RecentActivity";

const TransactionsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-xl md:text-2xl font-bold truncate">Transactions</h1>
          
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default TransactionsPage;
