import React from 'react';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plan } from '@/lib/mockServicesApi';
import { PriceBadge } from './PriceBadge';
import { cn } from '@/lib/utils';

interface PlanCardProps {
    plan: Plan;
    onSelect: (plan: Plan) => void;
    onViewDetails: (plan: Plan) => void;
    className?: string;
}

export function PlanCard({ plan, onSelect, onViewDetails, className }: PlanCardProps) {
    return (
        <Card className={cn(
            "flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            plan.popular && "border-primary shadow-md",
            className
        )}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                        {plan.popular && (
                            <Badge variant="default" className="mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 border-0">
                                Most Popular
                            </Badge>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(plan);
                        }}
                        aria-label="View Details"
                    >
                        <Info className="h-4 w-4" />
                    </Button>
                </div>
                <CardDescription className="mt-2 line-clamp-2 min-h-[40px]">
                    {plan.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
                <div className="mb-4">
                    <PriceBadge amount={plan.priceMonthly} interval="monthly" size="lg" />
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <span>or</span>
                        <PriceBadge amount={plan.priceAnnual} size="sm" orientation="row" />
                        <span>billed annually</span>
                    </div>
                </div>

                <ul className="space-y-2 text-sm">
                    {plan.features.slice(0, 5).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                    {plan.features.length > 5 && (
                        <li className="text-xs text-muted-foreground pl-6 pt-1">
                            + {plan.features.length - 5} more features
                        </li>
                    )}
                </ul>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                    onClick={() => onSelect(plan)}
                >
                    Select Plan
                </Button>
            </CardFooter>
        </Card>
    );
}
