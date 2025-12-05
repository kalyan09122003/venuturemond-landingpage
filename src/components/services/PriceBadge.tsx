import React from 'react';
import { cn } from '@/lib/utils';
import { formatDualCurrency } from '@/utils/priceFormatter';

interface PriceBadgeProps {
    amount: number;
    interval?: 'monthly' | 'annual';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    orientation?: 'row' | 'col';
}

export function PriceBadge({
    amount,
    interval,
    className,
    size = 'md',
    orientation = 'col' // Default to column for better responsiveness safe-guard
}: PriceBadgeProps) {
    const { usd, inr } = formatDualCurrency(amount);

    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-lg font-bold',
        lg: 'text-2xl font-bold'
    };

    // If orientation is explicitly 'row', try to keep it in a row, but allow wrap
    const isRow = orientation === 'row';

    return (
        <div className={cn(
            "flex",
            isRow ? "flex-wrap items-baseline gap-x-2" : "flex-col items-end",
            "leading-tight",
            className
        )}>
            <div className="flex items-baseline whitespace-nowrap">
                <span className={cn("text-primary", sizeClasses[size])}>
                    {usd} <span className="text-[0.6em] font-normal text-muted-foreground">USD</span>
                </span>
                {interval && (
                    <span className="ml-1 text-muted-foreground text-sm font-normal">
                        /{interval === 'monthly' ? 'mo' : 'yr'}
                    </span>
                )}
            </div>

            {isRow && <span className="hidden sm:inline text-muted-foreground/50 self-center">•</span>}

            <div className="flex items-baseline whitespace-nowrap">
                <span className={cn("text-muted-foreground", size === 'lg' ? 'text-lg' : 'text-xs')}>
                    {inr} <span className="text-[0.6em] font-normal">INR</span>
                </span>
                {interval && (
                    <span className="ml-1 text-muted-foreground text-[10px] font-normal">
                        /{interval === 'monthly' ? 'mo' : 'yr'}
                    </span>
                )}
            </div>
        </div>
    );
}
