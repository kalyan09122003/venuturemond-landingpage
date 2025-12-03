import React, { useEffect, useState } from 'react';
import { CartCheckout } from "@/components/ui/CartCheckout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "@/lib/mockApi";

export default function Checkout() {
    const [cart, setCart] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    const handleCheckout = async () => {
        // Create orders for each item in cart
        for (const item of cart) {
            await mockApi.createOrder({
                service: item.serviceName,
                amount: item.total,
                date: new Date().toISOString().split('T')[0],
                items: [{ name: `${item.serviceName} - ${item.planName}`, price: item.total }]
            });
        }

        // Clear cart
        localStorage.removeItem('cart');
        setCart([]);
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-muted-foreground">Go back to the catalog to add services.</p>
                <Button onClick={() => navigate('/client/services')}>
                    Browse Services
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <Button variant="ghost" onClick={() => navigate('/client/services')} className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" /> Back to Services
            </Button>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-muted-foreground">Review your items and complete purchase.</p>
            </div>

            <CartCheckout cart={cart} onCheckout={handleCheckout} />
        </div>
    );
}
