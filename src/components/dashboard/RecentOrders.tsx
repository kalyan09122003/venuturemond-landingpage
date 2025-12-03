import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { Order } from "@/lib/mock-data";

interface RecentOrdersProps {
  orders: Order[];
  loading?: boolean;
}

const statusVariants = {
  active: "active",
  pending: "pending",
  cancelled: "cancelled",
  completed: "completed",
} as const;

export function RecentOrders({ orders, loading }: RecentOrdersProps) {
  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <div className="h-6 w-32 skeleton rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/30">
                <div className="space-y-2">
                  <div className="h-4 w-40 skeleton rounded" />
                  <div className="h-3 w-24 skeleton rounded" />
                </div>
                <div className="h-6 w-16 skeleton rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/orders" className="gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium">{order.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.id} • {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariants[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <span className="text-sm font-medium">
                  ${order.amount.toLocaleString()}
                </span>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/dashboard/orders/${order.id}`}>
                    <Eye size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
