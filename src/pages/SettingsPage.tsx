
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Cloud, Lock, Key, Coins } from "lucide-react";

const SettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cloudProvider, setCloudProvider] = useState("langgraph");
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
      variant: "default"
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-primary" />
                <CardTitle>API Configuration</CardTitle>
              </div>
              <CardDescription>Configure your API connections for Polymarket and cloud services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="polymarket-api">Polymarket API Key</Label>
                <Input id="polymarket-api" type="password" placeholder="Enter your Polymarket API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coinbase-api">Coinbase API Key</Label>
                <Input id="coinbase-api" type="password" placeholder="Enter your Coinbase API key" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-primary" />
                <CardTitle>Cloud Integration</CardTitle>
              </div>
              <CardDescription>Configure external cloud services for your AI agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cloud-provider">Default Cloud Provider</Label>
                <Select 
                  value={cloudProvider} 
                  onValueChange={setCloudProvider}
                >
                  <SelectTrigger id="cloud-provider">
                    <SelectValue placeholder="Select cloud provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="langgraph">LangGraph Cloud</SelectItem>
                    <SelectItem value="autogen">AutoGen Cloud</SelectItem>
                    <SelectItem value="google">Google ADK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {cloudProvider === "langgraph" && (
                <div className="space-y-2">
                  <Label htmlFor="langgraph-api">LangGraph API Key</Label>
                  <Input id="langgraph-api" type="password" placeholder="Enter your LangGraph API key" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from the LangGraph Cloud dashboard
                  </p>
                </div>
              )}
              
              {cloudProvider === "autogen" && (
                <div className="space-y-2">
                  <Label htmlFor="autogen-api">AutoGen API Key</Label>
                  <Input id="autogen-api" type="password" placeholder="Enter your AutoGen API key" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from the AutoGen Cloud console
                  </p>
                </div>
              )}
              
              {cloudProvider === "google" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="google-project">Google Project ID</Label>
                    <Input id="google-project" placeholder="Enter your Google Cloud project ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="google-api">Google API Key</Label>
                    <Input id="google-api" type="password" placeholder="Enter your Google ADK API key" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Create an API key in the Google Cloud Console
                    </p>
                  </div>
                </>
              )}
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Cloud Agent Sync</p>
                    <p className="text-sm text-muted-foreground">Synchronize agent states between platforms</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-primary" />
                <CardTitle>Token Economy</CardTitle>
              </div>
              <CardDescription>Manage inference tokens and budget allocation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Token Budget Tracking</p>
                  <p className="text-sm text-muted-foreground">Track inference token usage across agents</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profit Optimization</p>
                  <p className="text-sm text-muted-foreground">Optimize agent strategies for token profitability</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Token Usage Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when agents exceed token budget</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Agent Settings</CardTitle>
              </div>
              <CardDescription>Configure your AI agent settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Multi-Agent Betting</p>
                  <p className="text-sm text-muted-foreground">Allow multiple agents to place bets on markets</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Agent Collaboration</p>
                  <p className="text-sm text-muted-foreground">Allow agents to share insights and collaborate</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cloud-to-Local Agent Communication</p>
                  <p className="text-sm text-muted-foreground">Enable cross-platform agent communication</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
