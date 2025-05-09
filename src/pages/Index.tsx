
import { useState } from "react";
import { StatsOverview } from "@/components/StatsOverview";
import { MarketChart } from "@/components/MarketChart";
import { AgentConfigurator } from "@/components/AgentConfigurator";
import { RecentActivity } from "@/components/RecentActivity";
import { AppSidebar } from "@/components/AppSidebar";
import { MultiAgentBetting } from "@/components/MultiAgentBetting";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // For demo purposes, simulate login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/1dc80e14-28e6-47e5-97e6-02b62ea66892.png" 
              alt="Fluidity Index Logo" 
              className="w-24 h-24 mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Fluidity Index
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-2">
            Multi-agent prediction markets and trading powered by AI
          </p>
          <p className="text-sm text-blue-400 max-w-md truncate">
            Next-generation multi-agent superintelligence benchmarks
          </p>
        </div>
        
        <div className="flex flex-col gap-6 w-full max-w-md px-4">
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold truncate">Welcome Back</h2>
            <p className="text-muted-foreground line-clamp-2">
              Sign in to access your AI trading agents and market predictions
            </p>
            
            <Button 
              onClick={handleLogin} 
              className="w-full"
              size="lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In with Coinbase
            </Button>
            
            <p className="text-xs text-center text-muted-foreground pt-2 line-clamp-2">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="link" className="text-sm text-muted-foreground">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-sm text-muted-foreground">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-xl md:text-2xl font-bold truncate">Dashboard</h1>
          
          <StatsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MarketChart />
            </div>
            <div>
              <AgentConfigurator />
            </div>
          </div>
          
          <MultiAgentBetting />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default Index;
