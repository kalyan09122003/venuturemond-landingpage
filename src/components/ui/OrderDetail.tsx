import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { PriceBadge } from "../services/PriceBadge";

interface OrderItem {
    name: string;
    price: number;
}

interface Order {
    id: string;
    service: string;
    status: string;
    amount: number;
    date: string;
    items: OrderItem[];
    invoiceId: string | null;
}

interface OrderDetailProps {
    order: Order;
    onBack: () => void;
}

export function OrderDetail({ order, onBack }: OrderDetailProps) {
    // Mock timeline steps based on status
    const getTimelineSteps = (status: string) => {
        const steps = [
            { label: 'Order Placed', date: order.date, completed: true },
            { label: 'Payment Confirmed', date: order.date, completed: ['paid', 'active', 'provisioning'].includes(status) },
            { label: 'Provisioning', date: 'In Progress', completed: ['active'].includes(status), current: status === 'provisioning' },
            { label: 'Active', date: '-', completed: status === 'active', current: status === 'active' }
        ];
        return steps;
    };

    const steps = getTimelineSteps(order.status);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" onClick={onBack} className="gap-2 pl-0 hover:pl-2 transition-all">
                <ArrowLeft className="h-4 w-4" /> Back to Orders
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{order.service}</h2>
                    <p className="text-muted-foreground">Order #{order.id}</p>
                </div>
                <div className="flex items-center gap-2">
                    {order.invoiceId && (
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" /> Download Invoice
                        </Button>
                    )}
                    <Badge className="text-lg px-4 py-1 capitalize" variant={order.status === 'active' ? 'default' : 'secondary'}>
                        {order.status}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Order Timeline</CardTitle>
                        <CardDescription>Track the progress of your service</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative border-l border-muted ml-4 space-y-8 pb-4">
                            {steps.map((step, index) => (
                                <div key={index} className="relative pl-8">
                                    <div className={`absolute -left-2.5 top-0.5 h-5 w-5 rounded-full border bg-background flex items-center justify-center
                    ${step.completed ? 'border-primary text-primary' : step.current ? 'border-primary text-primary animate-pulse' : 'border-muted text-muted-foreground'}`}>
                                        {step.completed ? <CheckCircle2 className="h-3 w-3" /> : step.current ? <Clock className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-medium ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {step.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{step.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm items-center">
                                    <span>{item.name}</span>
                                    <PriceBadge amount={item.price} />
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold items-center">
                            <span>Total</span>
                            <PriceBadge amount={order.amount} size="lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
