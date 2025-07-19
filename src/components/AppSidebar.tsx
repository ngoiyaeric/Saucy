
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart2, 
  Bot, 
  CreditCard, 
  Home, 
  Settings, 
  TrendingUp,
  Wallet,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  showLabel?: boolean;
};

const NavItem = ({ to, icon: Icon, label, active, showLabel = true }: NavItemProps) => (
  <Button
    variant="ghost"
    className={cn(
      "w-full justify-start gap-3 mb-1 font-normal truncate",
      active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
    )}
    asChild
  >
    <Link to={to}>
      <Icon size={18} />
      {showLabel && <span className="truncate">{label}</span>}
    </Link>
  </Button>
);

type AppSidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export function AppSidebar({ collapsed, toggleSidebar }: AppSidebarProps) {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  
  // Force collapse on mobile
  useEffect(() => {
    if (isMobile && !collapsed) {
      toggleSidebar();
    }
  }, [isMobile, collapsed, toggleSidebar]);
  
  const showLabels = !collapsed && !isMobile;

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[60px]" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed ? (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/72a16ebe-0782-487c-9198-8511991cc5ff.png" 
              alt="Logo" 
              className="h-6 w-6 mr-2" 
            />
            <h1 className="font-bold text-lg tracking-tight text-sidebar-foreground truncate">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fluidity Index
              </span>
            </h1>
          </div>
        ) : (
          <img 
            src="/lovable-uploads/72a16ebe-0782-487c-9198-8511991cc5ff.png" 
            alt="Logo" 
            className="h-6 w-6 mx-auto" 
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {!collapsed ? (
          <>
            <NavItem to="/" icon={Home} label="Dashboard" active={pathname === "/"} showLabel={showLabels} />
            <NavItem to="/markets" icon={BarChart2} label="Markets" active={pathname === "/markets"} showLabel={showLabels} />
            <NavItem to="/agents" icon={Bot} label="Multi-Agents" active={pathname === "/agents"} showLabel={showLabels} />
            <NavItem to="/trading" icon={TrendingUp} label="Trading" active={pathname === "/trading"} showLabel={showLabels} />
            <NavItem to="/wallet" icon={Wallet} label="Wallet" active={pathname === "/wallet"} showLabel={showLabels} />
            <NavItem to="/transactions" icon={CreditCard} label="Transactions" active={pathname === "/transactions"} showLabel={showLabels} />
            <NavItem to="/settings" icon={Settings} label="Settings" active={pathname === "/settings"} showLabel={showLabels} />
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/">
                <Home size={20} className={pathname === "/" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/markets">
                <BarChart2 size={20} className={pathname === "/markets" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/agents">
                <Bot size={20} className={pathname === "/agents" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/trading">
                <TrendingUp size={20} className={pathname === "/trading" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/wallet">
                <Wallet size={20} className={pathname === "/wallet" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/transactions">
                <CreditCard size={20} className={pathname === "/transactions" ? "text-primary" : ""} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full flex justify-center p-3 mb-1"
              asChild
            >
              <Link to="/settings">
                <Settings size={20} className={pathname === "/settings" ? "text-primary" : ""} />
              </Link>
            </Button>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-3">
        <ThemeToggle showLabel={showLabels} />
        
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground font-medium">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
