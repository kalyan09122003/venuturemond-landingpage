import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Download, CreditCard, Search } from "lucide-react";
import { Link } from "react-router-dom";
import type { Order } from "@/lib/mock-data";

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
  onPay?: (orderId: string) => void;
}

const statusVariants = {
  active: "active",
  pending: "pending",
  cancelled: "cancelled",
  completed: "completed",
} as const;

export function OrdersTable({ orders, loading, onPay }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 w-64 skeleton rounded" />
          <div className="h-10 w-40 skeleton rounded" />
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="h-12 skeleton" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 border-t border-border skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden glass">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Order ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-border">
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/dashboard/orders/${order.id}`}>
                          <Eye size={16} />
                        </Link>
                      </Button>
                      {order.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onPay?.(order.id)}
                        >
                          <CreditCard size={16} />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Download size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
