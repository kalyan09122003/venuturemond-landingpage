import React from 'react';
import { Category, Plan } from '@/lib/mockServicesApi';
import { PlanCard } from './PlanCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCategoryProps {
    category: Category;
    plans: Plan[];
    onSelectPlan: (plan: Plan) => void;
    onViewDetails: (plan: Plan) => void;
}

export function ServiceCategory({ category, plans, onSelectPlan, onViewDetails }: ServiceCategoryProps) {
    if (plans.length === 0) return null;

    return (
        <section className="py-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
                    <p className="text-muted-foreground mt-1 max-w-2xl">{category.description}</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-primary group">
                    View all services <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSelect={onSelectPlan}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
        </section>
    );
}
