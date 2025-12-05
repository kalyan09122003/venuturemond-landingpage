import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Plan, PlanConfig, PriceBreakdown, mockServicesApi } from '@/lib/mockServicesApi';
import { PriceBadge } from './PriceBadge';
import { CouponInput } from './CouponInput';
import { Loader2 } from 'lucide-react';

interface PlanConfiguratorProps {
    plan: Plan;
    open: boolean;
    onClose: () => void;
    onAddToCart: (config: PlanConfig, breakdown: PriceBreakdown) => void;
}

export function PlanConfigurator({ plan, open, onClose, onAddToCart }: PlanConfiguratorProps) {
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
    const [seats, setSeats] = useState<number>(1);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [couponCode, setCouponCode] = useState<string>('');
    const [breakdown, setBreakdown] = useState<PriceBreakdown | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            // Reset state when opening
            setBillingInterval('monthly');
            setSeats(1);
            setSelectedAddOns([]);
            setQuantity(1);
            setCouponCode('');
            updatePrice();
        }
    }, [open, plan]);

    useEffect(() => {
        if (open) {
            updatePrice();
        }
    }, [billingInterval, seats, selectedAddOns, quantity, couponCode]);

    const updatePrice = async () => {
        setLoading(true);
        try {
            const config: PlanConfig = {
                planId: plan.id,
                billingInterval,
                seats,
                selectedAddOns,
                quantity
            };
            const result = await mockServicesApi.calculatePrice(config, couponCode);
            setBreakdown(result);
        } catch (error) {
            console.error("Error calculating price:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (breakdown) {
            onAddToCart({
                planId: plan.id,
                billingInterval,
                seats,
                selectedAddOns,
                quantity
            }, breakdown);
            onClose();
        }
    };

    const toggleAddOn = (addOnId: string) => {
        setSelectedAddOns(prev =>
            prev.includes(addOnId)
                ? prev.filter(id => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Configure {plan.title}</DialogTitle>
                    <DialogDescription>{plan.description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Billing Interval */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                            <Label className="text-base">Billing Interval</Label>
                            <div className="text-sm text-muted-foreground">
                                Save 17% with annual billing
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="billing-mode" className={billingInterval === 'monthly' ? 'font-bold' : ''}>Monthly</Label>
                            <Switch
                                id="billing-mode"
                                checked={billingInterval === 'annual'}
                                onCheckedChange={(checked) => setBillingInterval(checked ? 'annual' : 'monthly')}
                            />
                            <Label htmlFor="billing-mode" className={billingInterval === 'annual' ? 'font-bold' : ''}>Annual</Label>
                        </div>
                    </div>

                    {/* Seats (if applicable) */}
                    {plan.perSeatPrice && (
                        <div className="space-y-2">
                            <Label>Number of Seats</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="number"
                                    min={1}
                                    value={seats}
                                    onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-24"
                                />
                                <span className="text-sm text-muted-foreground">
                                    x <PriceBadge amount={plan.perSeatPrice} /> /seat/mo
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Add-ons */}
                    {plan.addOns && plan.addOns.length > 0 && (
                        <div className="space-y-3">
                            <Label>Add-ons</Label>
                            {plan.addOns.map(addOn => (
                                <div key={addOn.id} className="flex items-center space-x-2 border p-3 rounded-md">
                                    <Checkbox
                                        id={addOn.id}
                                        checked={selectedAddOns.includes(addOn.id)}
                                        onCheckedChange={() => toggleAddOn(addOn.id)}
                                    />
                                    <div className="flex-1 grid gap-1.5 leading-none">
                                        <Label htmlFor={addOn.id} className="cursor-pointer font-medium">
                                            {addOn.title}
                                        </Label>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        +<PriceBadge amount={addOn.price} size="sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Coupon */}
                    <div className="space-y-2">
                        <Label>Coupon Code</Label>
                        <CouponInput onApply={setCouponCode} />
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    {breakdown ? (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-start">
                                <span className="text-muted-foreground mt-1">Base Price ({billingInterval})</span>
                                <PriceBadge amount={breakdown.basePrice} size="sm" />
                            </div>
                            {breakdown.seatsCost > 0 && (
                                <div className="flex justify-between items-start">
                                    <span className="text-muted-foreground mt-1">Seats ({seats})</span>
                                    <PriceBadge amount={breakdown.seatsCost} size="sm" />
                                </div>
                            )}
                            {breakdown.addOnsCost > 0 && (
                                <div className="flex justify-between items-start">
                                    <span className="text-muted-foreground mt-1">Add-ons</span>
                                    <PriceBadge amount={breakdown.addOnsCost} size="sm" />
                                </div>
                            )}
                            {breakdown.discountAmount > 0 && (
                                <div className="flex justify-between items-start text-green-600">
                                    <span className="mt-1">Discount</span>
                                    <div className="flex">
                                        <span>-</span>
                                        <PriceBadge amount={breakdown.discountAmount} size="sm" className="text-green-600" />
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between items-start text-muted-foreground">
                                <span className="mt-1">Tax (10% est.)</span>
                                <PriceBadge amount={breakdown.taxAmount} size="sm" />
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <PriceBadge amount={breakdown.total} size="lg" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleAddToCart}
                        disabled={loading || !breakdown}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0"
                    >
                        Add to Cart
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
