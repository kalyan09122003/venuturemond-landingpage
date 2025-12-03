import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  format?: "currency" | "number" | "percent";
  loading?: boolean;
}

export function KPICard({ title, value, change, icon: Icon, format = "number", loading }: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
        }).format(val);
      case "percent":
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-24 skeleton rounded" />
              <div className="h-8 w-32 skeleton rounded" />
              <div className="h-3 w-20 skeleton rounded" />
            </div>
            <div className="w-12 h-12 skeleton rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl md:text-3xl font-bold tracking-tight">
              {formatValue(value)}
            </p>
            {change !== undefined && (
              <div className={cn(
                "flex items-center gap-1 text-sm",
                change >= 0 ? "text-success" : "text-destructive"
              )}>
                {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(change)}%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="text-primary" size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
