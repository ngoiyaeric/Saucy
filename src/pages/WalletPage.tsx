
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsOverview } from "@/components/StatsOverview";
import { AIWalletAssistant } from "@/components/AIWalletAssistant";
import { ChatBot } from "@/components/ChatBot";

const WalletPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Wallet</h1>
          
          <StatsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Wallet Balance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">Ξ</span>
                    </div>
                    <span className="font-medium">Ethereum</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">1.245 ETH</div>
                    <div className="text-sm text-muted-foreground">$3,245.67</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-500 font-medium">P</span>
                    </div>
                    <span className="font-medium">Polymarket</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">2,500 USDC</div>
                    <div className="text-sm text-muted-foreground">$2,500.00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <AIWalletAssistant />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChatBot 
              title="Crypto Advisor" 
              assistantName="Crypto Expert"
            />
            <ChatBot 
              title="Risk Management" 
              variant="compact"
              assistantName="Risk Bot"
            />
            <ChatBot 
              title="Tax Helper" 
              variant="compact"
              assistantName="Tax Bot"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
