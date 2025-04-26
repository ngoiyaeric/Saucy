
import { useState } from "react";
import { Users, Hexagon, MessageSquareCode, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data for the demo
const mockAgents = [
  {
    id: 1,
    name: "Alpha Predictor",
    type: "Sentiment Analyzer",
    active: true,
    winRate: "72%",
    budget: "$500",
    focus: "Crypto Markets"
  },
  {
    id: 2,
    name: "Beta Forecaster",
    type: "Technical Analyzer",
    active: true,
    winRate: "68%",
    budget: "$750",
    focus: "Sports Events"
  },
  {
    id: 3,
    name: "Gamma Insights",
    type: "News Analyzer",
    active: false,
    winRate: "65%",
    budget: "$300",
    focus: "Politics"
  },
  {
    id: 4,
    name: "Delta Strategy",
    type: "LLM Reasoner",
    active: true,
    winRate: "71%",
    budget: "$600",
    focus: "Economics"
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

export function MultiAgentBetting() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAPIs, setConnectedAPIs] = useState({
    polymarket: false,
    langchain: false,
    xai: false,
    coinbase: false
  });

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
            {connectedAPIs.polymarket ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Polymarket Connected
              </Badge>
            ) : null}
            {connectedAPIs.langchain ? (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                LangChain Connected
              </Badge>
            ) : null}
            {connectedAPIs.xai ? (
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                XAI Connected
              </Badge>
            ) : null}
          </div>
        </div>
        <CardDescription>
          Configure your multi-agent betting system for Polymarket prediction markets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agents">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="connections">API Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Active Betting Agents</h3>
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
              <MessageSquareCode className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Agent Collaboration</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your agents are working together using LangChain for reasoning and XAI for transparent decision making. 
                  The ensemble strategy has improved win rates by 12% over individual agents.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="markets" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Available Polymarket Markets</h3>
              <Button size="sm" variant="outline">
                <Layers className="h-4 w-4 mr-2" />
                Refresh Markets
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Liquidity</TableHead>
                    <TableHead>Current Odds</TableHead>
                    <TableHead>Agent Recommended</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMarkets.map((market) => (
                    <TableRow key={market.id}>
                      <TableCell className="font-medium">{market.title}</TableCell>
                      <TableCell>{market.category}</TableCell>
                      <TableCell>{market.liquidity}</TableCell>
                      <TableCell>{market.odds}</TableCell>
                      <TableCell>
                        {market.recommended ? (
                          <Badge className="bg-market-bull text-primary-foreground">Recommended</Badge>
                        ) : (
                          <Badge variant="outline">Neutral</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">Analyze</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="connections" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Polymarket API</CardTitle>
                  <CardDescription>Connect to Polymarket for market access</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnect('polymarket')}
                    disabled={connectedAPIs.polymarket || isConnecting} 
                    className="w-full"
                  >
                    {connectedAPIs.polymarket ? "Connected" : isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">LangChain</CardTitle>
                  <CardDescription>Enable advanced reasoning for agents</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnect('langchain')}
                    disabled={connectedAPIs.langchain || isConnecting} 
                    className="w-full"
                  >
                    {connectedAPIs.langchain ? "Connected" : isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">XAI Framework</CardTitle>
                  <CardDescription>Add explainability to agent decisions</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnect('xai')}
                    disabled={connectedAPIs.xai || isConnecting} 
                    className="w-full"
                  >
                    {connectedAPIs.xai ? "Connected" : isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Coinbase API</CardTitle>
                  <CardDescription>Connect your Coinbase wallet for funding</CardDescription>
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
        </Tabs>
      </CardContent>
    </Card>
  );
}
