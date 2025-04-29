import { useState } from "react";
import { Bot, RefreshCw, Settings, AlertCircle, Coins, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export function AgentConfigurator() {
  const [agentStatus, setAgentStatus] = useState(false);
  const [riskLevel, setRiskLevel] = useState([50]);
  const [strategy, setStrategy] = useState("balanced");
  const [isTraining, setIsTraining] = useState(false);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [deployTarget, setDeployTarget] = useState("local");
  
  const handleTrain = () => {
    setIsTraining(true);
    // In a real app, this would trigger an API call to train the model
    setTimeout(() => {
      setIsTraining(false);
      toast({
        title: "Agent trained successfully",
        description: "Model has been updated with the latest market data",
        variant: "default"
      });
    }, 2500);
  };

  const handleStatusChange = (checked: boolean) => {
    setAgentStatus(checked);
    toast({
      title: checked ? "Agent activated" : "Agent deactivated",
      description: checked ? "Your agent is now running and monitoring markets" : "Your agent has been stopped",
      variant: "default"
    });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle>Primary Agent Configuration</CardTitle>
          </div>
          <Badge variant={agentStatus ? "default" : "secondary"}>
            {agentStatus ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription>
          Configure your primary AI trading agent parameters and strategy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="agent-status">Agent Status</Label>
            <div className="text-sm text-muted-foreground">
              Enable or disable automated trading
            </div>
          </div>
          <Switch
            id="agent-status"
            checked={agentStatus}
            onCheckedChange={handleStatusChange}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Risk Level</Label>
            <span className="text-sm font-medium">
              {riskLevel[0] < 33 ? "Conservative" : riskLevel[0] < 66 ? "Moderate" : "Aggressive"}
            </span>
          </div>
          <Slider
            value={riskLevel}
            min={0}
            max={100}
            step={1}
            onValueChange={setRiskLevel}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Conservative</span>
            <span>Moderate</span>
            <span>Aggressive</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="strategy-select">Trading Strategy</Label>
          <Select value={strategy} onValueChange={setStrategy}>
            <SelectTrigger id="strategy-select">
              <SelectValue placeholder="Select a strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="momentum">Momentum Trading</SelectItem>
              <SelectItem value="balanced">Balanced Approach</SelectItem>
              <SelectItem value="contrarian">Contrarian Strategy</SelectItem>
              <SelectItem value="sentiment">Sentiment Analysis</SelectItem>
              <SelectItem value="ensemble">Multi-Agent Ensemble</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ai-model-select">AI Foundation Model</Label>
          <Select value={aiModel} onValueChange={setAiModel}>
            <SelectTrigger id="ai-model-select">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
              <SelectItem value="palm-2">PaLM 2</SelectItem>
              <SelectItem value="mistral">Mistral</SelectItem>
              <SelectItem value="llama-3">Llama 3</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground mt-1">
            Powers agent reasoning and decision making capabilities
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deploy-target">Deployment Target</Label>
          <Select value={deployTarget} onValueChange={setDeployTarget}>
            <SelectTrigger id="deploy-target">
              <SelectValue placeholder="Select deployment target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local (This platform)</SelectItem>
              <SelectItem value="langgraph">LangGraph Cloud</SelectItem>
              <SelectItem value="autogen">AutoGen Cloud</SelectItem>
              <SelectItem value="google">Google ADK</SelectItem>
              <SelectItem value="ea-cloud">EA Cloud</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground mt-1">
            Choose where to deploy and run this agent
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Token Economy</Label>
            <span className="text-sm font-medium text-market-bull">+4,250 tokens earned</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tokens Used</span>
              <span>2,780 / 7,000</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">ROI</span>
              <span className="text-market-bull">+152%</span>
            </div>
            <Progress value={152} className="h-2 bg-blue-200" indicatorClassName="bg-market-bull" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 p-3 bg-secondary/50 rounded-lg flex items-start space-x-3">
            <Cpu className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">AI Processing</p>
              <p className="text-muted-foreground mt-1">
                Advanced inference enabled
              </p>
            </div>
          </div>
          
          <div className="flex-1 p-3 bg-secondary/50 rounded-lg flex items-start space-x-3">
            <Coins className="h-5 w-5 text-market-bull mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Token Tracking</p>
              <p className="text-muted-foreground mt-1">
                Profit optimized
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-secondary/50 rounded-lg flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-market-neutral mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Agent Performance</p>
            <p className="text-muted-foreground mt-1">
              Your agent has completed 124 trades with a 68% success rate in the last 30 days. Consider retraining to improve performance.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-4 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
        <Button 
          size="sm" 
          onClick={handleTrain} 
          disabled={isTraining}
        >
          {isTraining ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Training...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retrain Model
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
