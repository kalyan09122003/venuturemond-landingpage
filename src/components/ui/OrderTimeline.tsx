import React from 'react';
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
    id: string;
    label: string;
    status: 'pending' | 'current' | 'completed';
}

interface OrderTimelineProps {
    currentStep: number; // 0 to 3
}

export function OrderTimeline({ currentStep }: OrderTimelineProps) {
    const steps: TimelineStep[] = [
        { id: 'created', label: 'Order Created', status: currentStep >= 0 ? (currentStep > 0 ? 'completed' : 'current') : 'pending' },
        { id: 'paid', label: 'Payment Verified', status: currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'current') : 'pending' },
        { id: 'provisioning', label: 'Provisioning', status: currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'current') : 'pending' },
        { id: 'active', label: 'Active', status: currentStep >= 3 ? 'completed' : 'pending' },
    ];

    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-muted -z-10" />
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary transition-all duration-500 ease-in-out -z-10"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center bg-background px-2">
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                            step.status === 'completed' ? "bg-primary border-primary text-primary-foreground" :
                                step.status === 'current' ? "border-primary text-primary animate-pulse" :
                                    "border-muted text-muted-foreground bg-background"
                        )}>
                            {step.status === 'completed' ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : step.status === 'current' ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Circle className="w-5 h-5" />
                            )}
                        </div>
                        <span className={cn(
                            "mt-2 text-xs font-medium transition-colors duration-300",
                            step.status === 'pending' ? "text-muted-foreground" : "text-foreground"
                        )}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
