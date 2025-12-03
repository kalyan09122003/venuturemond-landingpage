import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface RevenueChartProps {
  data: { date: string; value: number }[];
  loading?: boolean;
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <div className="h-6 w-32 skeleton rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] skeleton rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(183, 74%, 44%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(183, 74%, 44%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(217, 33%, 20%)" }}
              />
              <YAxis
                tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(217, 33%, 20%)" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 10%)",
                  border: "1px solid hsl(217, 33%, 20%)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(210, 40%, 98%)" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(183, 74%, 44%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
