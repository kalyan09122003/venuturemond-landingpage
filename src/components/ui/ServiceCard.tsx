import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
}

interface Service {
    id: string;
    name: string;
    description: string;
    plans: Plan[];
}

interface ServiceCardProps {
    service: Service;
    onSelectPlan: (serviceId: string, planId: string) => void;
}

export function ServiceCard({ service, onSelectPlan }: ServiceCardProps) {
    return (
        <div className="space-y-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{service.name}</h2>
                <p className="text-muted-foreground">{service.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {service.plans.map((plan) => (
                    <Card key={plan.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold text-primary">${plan.price}</span>
                                <span className="text-muted-foreground">/mo</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-2 text-sm">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => onSelectPlan(service.id, plan.id)}>
                                Select Plan
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
