import { useEffect, useState } from "react";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { fetchOrders, type Order } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then((result) => {
      setOrders(result);
      setLoading(false);
    });
  }, []);

  const handlePay = (orderId: string) => {
    toast({
      title: "Payment Initiated",
      description: `Opening payment for order ${orderId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders & Subscriptions</h1>
        <p className="text-muted-foreground">Manage your orders and subscription plans.</p>
      </div>

      <OrdersTable orders={orders} loading={loading} onPay={handlePay} />
    </div>
  );
}
