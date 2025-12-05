import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Order {
    id: string;
    title: string;
    date: string;
    status: string;
    amount: string;
}

interface RecentOrdersProps {
    orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'provisioning': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
                <Button variant="link" className="text-xs h-auto p-0" onClick={() => navigate('/client/orders')}>
                    View all <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{order.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{order.id}</span>
                                    <span>•</span>
                                    <span>{order.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                                <p className="text-sm font-medium w-16 text-right">{order.amount}</p>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/client/orders/${order.id}`)}>
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
