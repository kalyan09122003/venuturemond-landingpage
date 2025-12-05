import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plan } from '@/lib/mockServicesApi';
import { PriceBadge } from './PriceBadge';
import { Check, X } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ComparePlansModalProps {
    plans: Plan[];
    open: boolean;
    onClose: () => void;
    onSelectPlan: (plan: Plan) => void;
    onRemovePlan: (planId: string) => void;
}

export function ComparePlansModal({
    plans,
    open,
    onClose,
    onSelectPlan,
    onRemovePlan
}: ComparePlansModalProps) {
    // Collect all unique features across all plans to build the matrix
    const allFeatures = Array.from(new Set(plans.flatMap(p => p.features)));

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="max-w-[90vw] md:max-w-4xl h-[80vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Compare Plans</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6 pt-0">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4">
                            {/* Header Row */}
                            <div className="sticky top-0 bg-background z-10 pt-4 pb-2 font-bold text-lg border-b">
                                Features
                            </div>
                            {plans.map(plan => (
                                <div key={plan.id} className="sticky top-0 bg-background z-10 pt-4 pb-2 border-b text-center relative group">
                                    <div className="font-bold text-lg">{plan.title}</div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-1 -right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => onRemovePlan(plan.id)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                            {[...Array(3 - plans.length)].map((_, i) => (
                                <div key={`empty-${i}`} className="sticky top-0 bg-background z-10 pt-4 pb-2 border-b text-center text-muted-foreground italic">
                                    Empty Slot
                                </div>
                            ))}

                            {/* Price Row */}
                            <div className="py-4 font-semibold border-b">Price</div>
                            {plans.map(plan => (
                                <div key={plan.id} className="py-4 text-center border-b flex justify-center">
                                    <PriceBadge amount={plan.priceMonthly} interval="monthly" size="md" />
                                </div>
                            ))}
                            {[...Array(3 - plans.length)].map((_, i) => <div key={`empty-price-${i}`} className="border-b" />)}

                            {/* Features Rows */}
                            {allFeatures.map((feature, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="py-3 text-sm border-b flex items-center">{feature}</div>
                                    {plans.map(plan => (
                                        <div key={`${plan.id}-${idx}`} className="py-3 border-b flex justify-center items-center">
                                            {plan.features.includes(feature) ? (
                                                <Check className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <X className="h-5 w-5 text-muted-foreground/30" />
                                            )}
                                        </div>
                                    ))}
                                    {[...Array(3 - plans.length)].map((_, i) => <div key={`empty-feat-${i}`} className="border-b" />)}
                                </React.Fragment>
                            ))}

                            {/* Action Row */}
                            <div className="py-6"></div>
                            {plans.map(plan => (
                                <div key={plan.id} className="py-6 text-center">
                                    <Button
                                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0"
                                        onClick={() => {
                                            onClose();
                                            onSelectPlan(plan);
                                        }}
                                    >
                                        Select
                                    </Button>
                                </div>
                            ))}
                            {[...Array(3 - plans.length)].map((_, i) => <div key={`empty-action-${i}`} />)}
                        </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
