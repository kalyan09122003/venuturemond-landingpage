import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '@/lib/mockApi';
import { Loader2 } from 'lucide-react';

export default function DemoCart() {
    const navigate = useNavigate();

    useEffect(() => {
        setupDemo();
    }, []);

    const setupDemo = async () => {
        // Reset cart to initial state
        const initialCart = {
            items: [
                {
                    id: "svc-mvp-01",
                    title: "MVP Development",
                    subtitle: "Full-stack build",
                    price_per_unit: 4999,
                    billing_interval: "month",
                    quantity: 1,
                    seats: 3,
                    add_ons: [
                        { "id": "priority-support", "title": "Priority Support", "price": 199 }
                    ]
                }
            ],
            coupon: null,
            tax_percent: 18
        };

        await mockApi.updateCart(initialCart);
        navigate('/client/cart');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Setting up demo cart...</p>
        </div>
    );
}
