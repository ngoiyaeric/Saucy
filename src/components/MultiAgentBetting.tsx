import { useState } from "react";
import { Users, Hexagon, Layers, Cloud, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock data for the demo
const mockAgents = [
  {
    id: 1,
    name: "Alpha Predictor",
    type: "Sentiment Analyzer",
    active: true,
    winRate: "72%",
    budget: "$500",
    focus: "Crypto Markets",
    cloudProvider: "LangGraph Cloud"
  },
  {
    id: 2,
    name: "Beta Forecaster",
    type: "Technical Analyzer",
    active: true,
    winRate: "68%",
    budget: "$750",
    focus: "Sports Events",
    cloudProvider: "AutoGen Cloud"
  },
  {
    id: 3,
    name: "Gamma Insights",
    type: "News Analyzer",
    active: false,
    winRate: "65%",
    budget: "$300",
    focus: "Politics",
    cloudProvider: "Google ADK"
  },
  {
    id: 4,
    name: "Delta Strategy",
    type: "LLM Reasoner",
    active: true,
    winRate: "71%",
    budget: "$600",
    focus: "Economics",
    cloudProvider: "LangGraph Cloud"
  }
];

const mockMarkets = [
  {
    id: 1,
    title: "BTC above $100K by EOY",
    category: "Crypto",
    liquidity: "$1.2M",
    odds: "34%",
    recommended: true
  },
  {
    id: 2,
    title: "Fed to cut rates in June",
    category: "Economics",
    liquidity: "$890K",
    odds: "65%",
    recommended: true
  },
  {
    id: 3,
    title: "NBA Finals Winner",
    category: "Sports",
    liquidity: "$2.4M",
    odds: "Varies",
    recommended: false
  }
];

const cloudProviders = [
  { id: "langgraph", name: "LangGraph Cloud", apiEndpointFormat: "https://api.langgraph.com/agents/{id}" },
  { id: "autogen", name: "AutoGen Cloud", apiEndpointFormat: "https://api.autogen-cloud.com/v1/agents/{id}" },
  { id: "google-adk", name: "Google ADK", apiEndpointFormat: "https://agents.googleapis.com/v1/projects/{project}/agents/{id}" },
  { id: "ea-cloud", name: "EA Cloud", apiEndpointFormat: "https://api.eagents.cloud/agents/{id}" }
];

export function MultiAgentBetting() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAPIs, setConnectedAPIs] = useState({
    coinbase: false
  });
  const [newAgent, setNewAgent] = useState({
    name: "",
    provider: "",
    agentId: "",
    apiKey: ""
  });
  const [isAddingAgent, setIsAddingAgent] = useState(false);

  // Simulates connecting to an API
  const handleConnect = (api: string) => {
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setConnectedAPIs(prev => ({
        ...prev,
        [api]: true
      }));
      setIsConnecting(false);
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${api} API`,
        variant: "default"
      });
    }, 1500);
  };

  // Handle adding a new external agent
  const handleAddExternalAgent = () => {
    if (!newAgent.name || !newAgent.provider || !newAgent.agentId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsAddingAgent(true);
    
    // Simulate adding an external agent
    setTimeout(() => {
      // This would actually integrate with the cloud provider API in production
      toast({
        title: "Agent added successfully",
        description: `${newAgent.name} has been added from ${newAgent.provider}`,
        variant: "default"
      });
      
      setIsAddingAgent(false);
      setNewAgent({
        name: "",
        provider: "",
        agentId: "",
        apiKey: ""
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Multi-Agent Betting System</CardTitle>
          </div>
          <div className="flex space-x-2">
            {connectedAPIs.coinbase ? (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                Coinbase Connected
              </Badge>
            ) : null}
          </div>
        </div>
        <CardDescription>
          Configure your multi-agent trading system powered by Coinbase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="connections">API Connections</TabsTrigger>
            <TabsTrigger value="external">External Agents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Active Trading Agents</h3>
              <Button size="sm">
                <Hexagon className="h-4 w-4 mr-2" />
                Create New Agent
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Market Focus</TableHead>
                    <TableHead>Cloud Provider</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.type}</TableCell>
                      <TableCell>{agent.winRate}</TableCell>
                      <TableCell>{agent.budget}</TableCell>
                      <TableCell>{agent.focus}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {agent.cloudProvider}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`agent-${agent.id}`} checked={agent.active} />
                          <Label htmlFor={`agent-${agent.id}`}>{agent.active ? "Active" : "Inactive"}</Label>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-md flex items-start space-x-3">
              <Cloud className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Agent Collaboration</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your agents are working together using multi-agent coordination across multiple cloud providers.
                  The ensemble strategy has improved win rates by 12% over individual agents.
                </p>
              </div>
            </div>
          </TabsContent>
          
          
          <TabsContent value="connections" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Coinbase API</CardTitle>
                  <CardDescription>Connect your Coinbase wallet for trading</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnect('coinbase')}
                    disabled={connectedAPIs.coinbase || isConnecting} 
                    className="w-full"
                  >
                    {connectedAPIs.coinbase ? "Connected" : isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">
                Note: In a production environment, you would need to provide API keys and complete OAuth authorization flows for each service. 
                This demo simulates successful connections.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="external" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Connect External Cloud Agents</h3>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                <Cloud className="h-4 w-4 mr-1" />
                Cloud Integration
              </Badge>
            </div>
            
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-md">Add External Agent</CardTitle>
                <CardDescription>Connect agents deployed on third-party cloud platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name">Agent Name</Label>
                    <Input 
                      id="agent-name" 
                      placeholder="Enter a name for this agent"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cloud-provider">Cloud Provider</Label>
                    <Select 
                      value={newAgent.provider} 
                      onValueChange={(value) => setNewAgent({...newAgent, provider: value})}
                    >
                      <SelectTrigger id="cloud-provider">
                        <SelectValue placeholder="Select cloud provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {cloudProviders.map(provider => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-id">Agent ID / URL</Label>
                    <Input 
                      id="agent-id" 
                      placeholder="Enter the agent ID or URL"
                      value={newAgent.agentId}
                      onChange={(e) => setNewAgent({...newAgent, agentId: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground">
                      The unique ID or endpoint URL for your deployed agent
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key (Optional)</Label>
                    <Input 
                      id="api-key" 
                      type="password"
                      placeholder="Enter API key if required"
                      value={newAgent.apiKey}
                      onChange={(e) => setNewAgent({...newAgent, apiKey: e.target.value})}
                    />
                  </div>
                </div>
                
                {newAgent.provider && (
                  <div className="bg-secondary/50 p-3 rounded-md text-sm">
                    <p className="font-medium">Connection Format</p>
                    <code className="text-xs block mt-1 text-muted-foreground break-all">
                      {cloudProviders.find(p => p.id === newAgent.provider)?.apiEndpointFormat.replace('{id}', 'your-agent-id')}
                    </code>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="default"
                  className="flex items-center"
                  onClick={handleAddExternalAgent}
                  disabled={isAddingAgent}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {isAddingAgent ? "Connecting..." : "Add External Agent"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="bg-secondary/50 p-4 rounded-md flex items-start space-x-3">
              <Cloud className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Cloud Integration Benefits</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect agents from LangGraph Cloud, AutoGen Cloud, Google ADK, or EA Cloud to leverage 
                  models and workflows deployed on specialized AI infrastructure. These external 
                  agents work seamlessly with your local agents for optimal performance.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
