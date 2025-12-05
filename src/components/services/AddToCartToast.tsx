import React from 'react';
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

// This isn't a component itself but a helper to trigger the specific toast
// because shadcn/ui toast is imperative.

export const useAddToCartToast = () => {
    const { toast } = useToast();

    const showAddToCartToast = (itemName: string, onViewCart: () => void) => {
        toast({
            title: "Added to Cart",
            description: (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{itemName} has been added to your cart.</span>
                </div>
            ),
            action: (
                <ToastAction altText="View Cart" onClick={onViewCart}>
                    <div className="flex items-center gap-1">
                        <ShoppingCart className="h-3 w-3" /> View Cart
                    </div>
                </ToastAction>
            ),
            duration: 3000,
        });
    };

    return { showAddToCartToast };
};
