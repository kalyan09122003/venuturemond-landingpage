import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartIconWithCountProps {
    count: number;
    onClick?: () => void;
    className?: string;
}

export function CartIconWithCount({ count, onClick, className }: CartIconWithCountProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("relative", className)}
            onClick={onClick}
            aria-label="Shopping Cart"
        >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300">
                    {count > 9 ? '9+' : count}
                </span>
            )}
        </Button>
    );
}
