import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockApi } from '@/lib/mockApi';
import { ContractViewerPlaceholder } from '@/components/ui/ContractViewerPlaceholder';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Contract() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);

    useEffect(() => {
        if (!orderId) {
            navigate('/client/orders');
            return;
        }
        loadOrder();
    }, [orderId]);

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

    const handleSign = async () => {
        if (!orderId) return;
        setSigning(true);
        await mockApi.signContract(orderId);
        setSigning(false);
        navigate(`/client/order-confirmation?orderId=${orderId}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 max-w-4xl animate-in fade-in duration-500">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Sign Contract</h1>
                <p className="text-muted-foreground mt-2">Please review and sign the agreement to finalize your order.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Master Services Agreement</CardTitle>
                    <CardDescription>Order Ref: {order.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContractViewerPlaceholder onSign={handleSign} isSigning={signing} />
                </CardContent>
            </Card>
        </div>
    );
}
