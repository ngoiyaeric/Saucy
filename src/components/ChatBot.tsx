
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bot, ArrowUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  role: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you with market insights or trading today?",
    role: "bot",
    timestamp: new Date(),
  },
];

type ChatBotProps = {
  title?: string;
  variant?: "default" | "compact" | "mini";
  assistantName?: string;
  className?: string;
};

export function ChatBot({ 
  title = "AI Assistant", 
  variant = "default", 
  assistantName = "Market Assistant",
  className 
}: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const responses = [
        "Based on current market trends, we might see increased volatility in the next 24 hours.",
        "I've analyzed recent trading patterns and noticed a potential opportunity in the crypto market.",
        "Market sentiment is trending positive according to my latest analysis.",
        "I've detected an unusual pattern in recent trades. Would you like me to investigate further?",
        "Based on historical data, similar market conditions have led to upward trends 68% of the time.",
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render different variants
  if (variant === "compact") {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bot className="h-5 w-5 mr-2 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[240px] overflow-y-auto flex flex-col space-y-2 pr-2">
            {messages.slice(-3).map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-2 rounded-lg p-2",
                  message.role === "bot" 
                    ? "bg-muted/50" 
                    : "bg-primary/10 ml-auto"
                )}
              >
                {message.role === "bot" && (
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
                {message.role === "user" && (
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2 rounded-lg p-2 bg-muted/50">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex space-x-1 items-center">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about market trends..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              type="button"
              disabled={!input.trim()}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "mini") {
    return (
      <Card className={cn("border-border bg-card", className)}>
        <CardHeader className="py-2 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-4 w-4 mr-2 text-primary" />
              <CardTitle className="text-sm">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <div className="max-h-[100px] overflow-y-auto text-xs">
            <p className="text-muted-foreground">{messages[messages.length - 1].content}</p>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Quick query..."
              className="flex-1 h-8 text-xs"
            />
            <Button 
              onClick={handleSendMessage} 
              size="sm"
              type="button"
              className="h-8 w-8 p-0"
              disabled={!input.trim()}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[320px] overflow-y-auto flex flex-col space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-3",
                message.role === "bot" 
                  ? "bg-muted/50" 
                  : "bg-primary/10 ml-auto"
              )}
            >
              {message.role === "bot" && (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              <div>
                <div className="text-sm font-medium mb-1">
                  {message.role === "bot" ? assistantName : "You"}
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3 rounded-lg p-3 bg-muted/50">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium mb-1">{assistantName}</div>
                <div className="flex space-x-1 items-center">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for market insights or trading advice..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            type="button"
            disabled={!input.trim()}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
