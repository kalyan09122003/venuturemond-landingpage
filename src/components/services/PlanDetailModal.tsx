import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plan } from '@/lib/mockServicesApi';
import { PriceBadge } from './PriceBadge';
import { Check } from 'lucide-react';

interface PlanDetailModalProps {
    plan: Plan;
    open: boolean;
    onClose: () => void;
    onConfigure: () => void;
    onCompare: (checked: boolean) => void;
    isCompared: boolean;
}

export function PlanDetailModal({
    plan,
    open,
    onClose,
    onConfigure,
    onCompare,
    isCompared
}: PlanDetailModalProps) {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{plan.title}</DialogTitle>
                    <DialogDescription className="text-base mt-2">
                        {plan.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                        <PriceBadge amount={plan.priceMonthly} interval="monthly" size="lg" />
                        <div className="flex items-baseline gap-2 text-muted-foreground">
                            <span>or</span>
                            <PriceBadge amount={plan.priceAnnual} interval="annual" size="md" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Features included:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {plan.limits && (
                        <div className="space-y-2">
                            <h4 className="font-semibold">Limits:</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {Object.entries(plan.limits).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b pb-1">
                                        <span className="capitalize text-muted-foreground">{key}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-4 sm:justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="compare-plan"
                            checked={isCompared}
                            onCheckedChange={(checked) => onCompare(checked as boolean)}
                        />
                        <Label htmlFor="compare-plan" className="cursor-pointer">Compare this plan</Label>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">Close</Button>
                        <Button
                            onClick={() => {
                                onClose();
                                onConfigure();
                            }}
                            className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0"
                        >
                            Configure & Add to Cart
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
