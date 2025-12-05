import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Looks like you haven't added any services yet. Browse our catalog to find the perfect plan for your needs.
                </p>
            </div>
            <Button onClick={() => navigate('/dashboard/services')} size="lg">
                Browse Services
            </Button>
        </div>
    );
}
