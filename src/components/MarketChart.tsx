
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - would be replaced with real API data
const generateMockData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate some random values that look like market data
    const btcValue = 35000 + Math.random() * 10000;
    const ethValue = 2200 + Math.random() * 500;
    const marketSentiment = 50 + Math.random() * 40 - Math.random() * 20;
    
    data.push({
      date: date.toLocaleDateString(),
      BTC: btcValue.toFixed(2),
      ETH: ethValue.toFixed(2),
      sentiment: marketSentiment.toFixed(1),
    });
  }
  
  return data;
};

export function MarketChart() {
  const [data, setData] = useState(generateMockData());
  const [timeframe, setTimeframe] = useState("30d");
  const [chartType, setChartType] = useState("price");
  
  // In a real application, this would fetch data from an API
  useEffect(() => {
    // This would be an API call in a real app
    setData(generateMockData());
  }, [timeframe]);

  const chartConfig = {
    price: {
      lines: [
        { dataKey: "BTC", stroke: "#f7931a", name: "Bitcoin" },
        { dataKey: "ETH", stroke: "#627eea", name: "Ethereum" },
      ],
      yAxisLabel: "Price ($)",
    },
    sentiment: {
      lines: [
        { dataKey: "sentiment", stroke: "#8b5cf6", name: "Market Sentiment" },
      ],
      yAxisLabel: "Sentiment Score",
    },
  };

  const activeConfig = chartConfig[chartType as keyof typeof chartConfig];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Market Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[130px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="sentiment">Sentiment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7d</SelectItem>
                <SelectItem value="30d">30d</SelectItem>
                <SelectItem value="90d">90d</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "hsl(var(--muted-foreground))" }} 
                tickMargin={10}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis 
                label={{ 
                  value: activeConfig.yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: "hsl(var(--muted-foreground))" } 
                }}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--card-foreground))"
                }} 
              />
              <Legend />
              {activeConfig.lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  name={line.name}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
