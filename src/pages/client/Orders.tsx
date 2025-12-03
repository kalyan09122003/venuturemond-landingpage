import React, { useEffect, useState } from 'react';
import { OrderList } from "@/components/ui/OrderList";
import { OrderDetail } from "@/components/ui/OrderDetail";
import { mockApi } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await mockApi.getOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (selectedOrderId) {
        const order = orders.find(o => o.id === selectedOrderId);
        if (!order) return <div>Order not found</div>;
        return <OrderDetail order={order} onBack={() => setSelectedOrderId(null)} />;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-muted-foreground">Manage and track your service orders.</p>
            </div>
            <OrderList orders={orders} onOrderClick={setSelectedOrderId} />
        </div>
    );
}
