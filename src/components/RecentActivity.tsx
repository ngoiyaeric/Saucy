
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for recent transactions
const mockActivities = [
  {
    id: "1",
    type: "trade",
    asset: "BTC",
    action: "Buy",
    amount: "0.025",
    price: "$42,350.00",
    time: "10 minutes ago",
    status: "completed",
    profit: null,
  },
  {
    id: "2",
    type: "prediction",
    market: "US Election 2024",
    position: "Democrat Win",
    amount: "$150.00",
    odds: "1.85",
    time: "2 hours ago",
    status: "active",
    profit: null,
  },
  {
    id: "3",
    type: "trade",
    asset: "ETH",
    action: "Sell",
    amount: "1.5",
    price: "$2,856.25",
    time: "5 hours ago",
    status: "completed",
    profit: "+$126.50",
  },
  {
    id: "4",
    type: "prediction",
    market: "FOMC Interest Rate Decision",
    position: "No Change",
    amount: "$200.00",
    odds: "1.32",
    time: "1 day ago",
    status: "completed",
    profit: "+$64.00",
  },
  {
    id: "5",
    type: "agent_action",
    description: "Agent reconfigured trading strategy",
    time: "1 day ago",
    status: "system",
    profit: null,
  }
];

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {mockActivities.map((activity) => (
            <li 
              key={activity.id}
              className="pb-3 border-b border-border last:border-0 last:pb-0"
            >
              {activity.type === "trade" ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      <span className={cn(
                        activity.action === "Buy" ? "text-market-bull" : "text-market-bear"
                      )}>
                        {activity.action}
                      </span> {activity.amount} {activity.asset}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.price} · {activity.time}
                    </p>
                  </div>
                  {activity.profit && (
                    <div className="flex items-center">
                      {activity.profit.startsWith("+") ? (
                        <ArrowUpRight className="h-4 w-4 text-market-bull mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-market-bear mr-1" />
                      )}
                      <span className={cn(
                        "font-medium",
                        activity.profit.startsWith("+") ? "text-market-bull" : "text-market-bear"
                      )}>
                        {activity.profit}
                      </span>
                    </div>
                  )}
                </div>
              ) : activity.type === "prediction" ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.position} ({activity.market})</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.amount} at {activity.odds} odds · {activity.time}
                    </p>
                  </div>
                  {activity.status === "active" ? (
                    <div className="bg-market-neutral/20 text-market-neutral px-2 py-1 rounded text-xs font-medium">
                      Active
                    </div>
                  ) : activity.profit ? (
                    <div className="flex items-center">
                      <ArrowUpRight className="h-4 w-4 text-market-bull mr-1" />
                      <span className="font-medium text-market-bull">
                        {activity.profit}
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
