
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure your API connections for Polymarket, LangChain, and XAI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="polymarket-api">Polymarket API Key</Label>
                <Input id="polymarket-api" type="password" placeholder="Enter your Polymarket API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="langchain-api">LangChain API Key</Label>
                <Input id="langchain-api" type="password" placeholder="Enter your LangChain API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="xai-api">XAI API Key</Label>
                <Input id="xai-api" type="password" placeholder="Enter your XAI API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coinbase-api">Coinbase API Key</Label>
                <Input id="coinbase-api" type="password" placeholder="Enter your Coinbase API key" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Configure your AI agent settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Multi-Agent Betting</p>
                  <p className="text-sm text-muted-foreground">Allow multiple agents to place bets on markets</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Agent Collaboration</p>
                  <p className="text-sm text-muted-foreground">Allow agents to share insights and collaborate</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Use Explainable AI</p>
                  <p className="text-sm text-muted-foreground">Enable XAI for transparent decision-making</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
