
import { useState, useRef } from "react";
import { StatsOverview } from "@/components/StatsOverview";
import { MarketChart } from "@/components/MarketChart";
import { AgentConfigurator } from "@/components/AgentConfigurator";
import { RecentActivity } from "@/components/RecentActivity";
import { AppSidebar } from "@/components/AppSidebar";
import { MultiAgentBetting } from "@/components/MultiAgentBetting";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // For demo purposes, simulate login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  const createRipple = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newRipple = {
        id: Date.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-950/20 via-blue-900/10 to-blue-800/20 cursor-none"
        onMouseMove={handleMouseMove}
        onClick={createRipple}
      >
        {/* Animated Background Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0, 1, 0.5, 1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Cursor Follower */}
        <motion.div
          className="absolute w-6 h-6 bg-blue-400/20 rounded-full pointer-events-none z-50 blur-sm"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-blue-300/60 rounded-full pointer-events-none z-50"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Click Ripples */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute border border-blue-400/40 rounded-full pointer-events-none"
            initial={{
              x: ripple.x,
              y: ripple.y,
              width: 0,
              height: 0,
              translateX: "-50%",
              translateY: "-50%",
              opacity: 1,
            }}
            animate={{
              width: [0, 100, 200],
              height: [0, 100, 200],
              opacity: [1, 0.6, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Fluid Wave Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-blue-300/30 to-blue-600/20 blur-3xl transform scale-150" />
        </motion.div>

        <motion.div 
          className="text-center mb-8 z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center">
            <motion.img 
              src="/lovable-uploads/1dc80e14-28e6-47e5-97e6-02b62ea66892.png" 
              alt="Fluidity Index Logo" 
              className="w-24 h-24 mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeOut",
                type: "spring",
                bounce: 0.3
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            />
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Fluidity Index
            </motion.h1>
          </div>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-md mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Multi-agent prediction markets and trading powered by AI
          </motion.p>
          <motion.p 
            className="text-sm text-blue-400 max-w-md truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Next-generation multi-agent superintelligence benchmarks
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col gap-6 w-full max-w-md px-4 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.div 
            className="bg-card/80 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 space-y-4 shadow-lg shadow-blue-500/10"
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgb(59 130 246 / 0.4)",
              transition: { duration: 0.3 }
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.h2 
              className="text-xl font-semibold truncate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="text-muted-foreground line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Sign in to access your AI trading agents and market predictions
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Button 
                onClick={handleLogin} 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0 shadow-lg shadow-blue-500/25"
                size="lg"
              >
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  Sign In with Coinbase
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-xs text-center text-muted-foreground pt-2 line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="link" className="text-sm text-muted-foreground hover:text-blue-400">
                Privacy Policy
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="link" className="text-sm text-muted-foreground hover:text-blue-400">
                Terms of Service
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
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
