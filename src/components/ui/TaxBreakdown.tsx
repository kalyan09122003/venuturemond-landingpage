import React from 'react';
import { Separator } from "@/components/ui/separator";

interface TaxBreakdownProps {
    subtotal: number;
    taxPercent: number;
}

export function TaxBreakdown({ subtotal, taxPercent }: TaxBreakdownProps) {
    const taxAmount = subtotal * (taxPercent / 100);
    const total = subtotal + taxAmount;

    return (
        <div className="space-y-3 pt-4">
            <h4 className="font-medium text-sm">Tax Breakdown</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
                <div className="flex justify-between">
                    <span>State Tax ({taxPercent / 2}%)</span>
                    <span>${(taxAmount / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Central Tax ({taxPercent / 2}%)</span>
                    <span>${(taxAmount / 2).toFixed(2)}</span>
                </div>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-sm">
                <span>Total Tax</span>
                <span>${taxAmount.toFixed(2)}</span>
            </div>
        </div>
    );
}
