
import { 
  ArrowDownRight, 
  ArrowUpRight,
  Percent,
  DollarSign 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockStats = [
  {
    title: "Total Portfolio Value",
    value: "$14,532.89",
    change: "+5.25%",
    increasing: true,
    icon: DollarSign
  },
  {
    title: "Active Predictions",
    value: "32",
    change: "+12.3%",
    increasing: true,
    icon: Percent
  },
  {
    title: "Win Rate",
    value: "68.4%",
    change: "-2.1%",
    increasing: false,
    icon: Percent
  },
  {
    title: "Market Sentiment",
    value: "Bullish",
    change: "+3.2%",
    increasing: true,
    icon: ArrowUpRight
  }
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockStats.map((stat, index) => (
        <Card key={index} className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon 
                className={cn(
                  "h-5 w-5", 
                  stat.increasing ? "text-market-bull" : "text-market-bear"
                )} 
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-1">
              {stat.increasing ? (
                <ArrowUpRight className="h-4 w-4 mr-1 text-market-bull" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1 text-market-bear" />
              )}
              <span 
                className={cn(
                  "text-sm", 
                  stat.increasing ? "text-market-bull" : "text-market-bear"
                )}
              >
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
