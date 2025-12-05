import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '@/lib/mockApi';
import { CartItem } from '@/components/ui/CartItem';
import { CartSummary } from '@/components/ui/CartSummary';
import { CartEmpty } from '@/components/ui/CartEmpty';
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from 'lucide-react';

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        setLoading(true);
        const data = await mockApi.getCart();
        setCart(data);
        setLoading(false);
    };

    const handleUpdateItem = async (itemId: string, updates: any) => {
        if (!cart) return;
        const newItems = cart.items.map((item: any) =>
            item.id === itemId ? { ...item, ...updates } : item
        );
        const updatedCart = { ...cart, items: newItems };
        // Optimistic update
        setCart(mockApi.calculateTotals(updatedCart));
        // Sync with API
        const result = await mockApi.updateCart(updatedCart);
        setCart(result);
    };

    const handleRemoveItem = async (itemId: string) => {
        if (!cart) return;
        // Optimistic update
        const newItems = cart.items.filter((item: any) => item.id !== itemId);
        const updatedCart = { ...cart, items: newItems };
        setCart(mockApi.calculateTotals(updatedCart));

        const result = await mockApi.removeItem(itemId);
        setCart(result);
    };

    const handleApplyCoupon = async (code: string) => {
        const result = await mockApi.applyCoupon(code);
        if (result.success && result.cart) {
            setCart(result.cart);
        }
        return result;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return <CartEmpty />;
    }

    return (
        <div className="container mx-auto py-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-4">
                <Button variant="ghost" onClick={() => navigate('/client/services')} className="w-fit pl-0 gap-2 hover:bg-transparent hover:text-primary">
                    <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                    <p className="text-muted-foreground">Review your selected services and plans.</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 items-start">
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item: any) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdateItem}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>

                <div className="lg:col-span-1 order-last lg:order-none">
                    <CartSummary
                        totals={cart.totals || { subtotal: 0, discount: 0, tax: 0, total: 0 }}
                        taxPercent={cart.tax_percent}
                        onApplyCoupon={handleApplyCoupon}
                        onCheckout={() => navigate('/client/checkout')}
                    />
                </div>
            </div>
        </div>
    );
}
