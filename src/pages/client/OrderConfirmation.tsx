import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockApi } from '@/lib/mockApi';
import { OrderTimeline } from '@/components/ui/OrderTimeline';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [timelineStep, setTimelineStep] = useState(2); // Start at Provisioning since we just signed

    useEffect(() => {
        if (!orderId) {
            navigate('/client/orders');
            return;
        }
        loadOrder();
    }, [orderId]);

    useEffect(() => {
        if (!order) return;

        // Simulate timeline progression
        const timer1 = setTimeout(() => {
            setTimelineStep(3); // Active
            mockApi.updateOrderStatus(order.id, 'active');
        }, 4000);

        return () => clearTimeout(timer1);
    }, [order]);

    const loadOrder = async () => {
        setLoading(true);
        const orders = await mockApi.getOrders();
        const foundOrder = orders.find((o: any) => o.id === orderId);
        if (!foundOrder) {
            navigate('/client/orders');
            return;
        }
        setOrder(foundOrder);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 max-w-3xl animate-in fade-in duration-500">
            <div className="text-center space-y-4 mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gradient">Order Confirmed!</h1>
                <p className="text-muted-foreground text-lg">
                    Thank you for your purchase. Your order <span className="font-mono font-medium text-foreground">{order.id}</span> is being processed.
                </p>
            </div>

            <Card className="mb-8">
                <CardContent className="pt-6">
                    <OrderTimeline currentStep={timelineStep} />
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>What's Next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Your services are currently being provisioned. You will receive an email notification once everything is ready.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            You can track the status of your order in the Orders section.
                        </p>
                        <Button className="w-full mt-2" variant="outline" onClick={() => navigate('/client/orders')}>
                            Go to Orders <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Invoice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded-md bg-muted/50">
                            <div className="space-y-1">
                                <p className="font-medium text-sm">Invoice #{order.id.replace('ORD', 'INV')}</p>
                                <p className="text-xs text-muted-foreground">Amount: ${order.amount.toLocaleString()}</p>
                            </div>
                            <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            A copy has been sent to your email.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
