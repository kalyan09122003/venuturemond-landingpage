import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Info } from "lucide-react";
import { PriceBadge } from "../services/PriceBadge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartSummaryProps {
    totals: {
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
    };
    taxPercent: number;
    onApplyCoupon: (code: string) => Promise<any>;
    onCheckout: () => void;
}

export function CartSummary({ totals, taxPercent, onApplyCoupon, onCheckout }: CartSummaryProps) {
    const [couponCode, setCouponCode] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleApply = async () => {
        if (!couponCode) return;
        setIsApplying(true);
        setCouponMessage(null);
        const result = await onApplyCoupon(couponCode);
        setIsApplying(false);

        if (result.success) {
            setCouponMessage({ type: 'success', text: result.message });
        } else {
            setCouponMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-muted-foreground">Subtotal</span>
                        <PriceBadge amount={totals.subtotal} />
                    </div>

                    {totals.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600 items-center">
                            <span>Discount</span>
                            <div className="flex items-center">
                                <span>-</span>
                                <PriceBadge amount={totals.discount} className="text-green-600" />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between text-sm items-center">
                        <span className="text-muted-foreground flex items-center gap-1">
                            Tax
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Tax Rate: {taxPercent}%</p>
                                        <p>State Tax: {(totals.tax / 2).toFixed(2)}</p>
                                        <p>Central Tax: {(totals.tax / 2).toFixed(2)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </span>
                        <PriceBadge amount={totals.tax} />
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between font-bold text-lg items-center">
                        <span>Total</span>
                        <PriceBadge amount={totals.total} size="lg" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button variant="outline" onClick={handleApply} disabled={isApplying || !couponCode}>
                            {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                        </Button>
                    </div>
                    {couponMessage && (
                        <p className={`text-xs ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {couponMessage.text}
                        </p>
                    )}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" size="lg" onClick={onCheckout}>
                    Proceed to Checkout
                </Button>
            </CardContent>
        </Card>
    );
}
