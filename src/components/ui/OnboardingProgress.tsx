import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface OnboardingStep {
    id: string;
    label: string;
    status: 'completed' | 'pending' | 'actionable';
    actionLabel?: string;
    link?: string;
}

interface OnboardingProgressProps {
    progress: number;
    steps: OnboardingStep[];
}

export function OnboardingProgress({ progress, steps }: OnboardingProgressProps) {
    const navigate = useNavigate();

    const handleAction = (link?: string) => {
        if (link) navigate(link);
    };

    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Onboarding Progress</CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
                <div className="space-y-1">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center justify-between py-2 group">
                            <div className="flex items-center gap-3">
                                {step.status === 'completed' ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Circle className={`h-5 w-5 ${step.status === 'actionable' ? 'text-primary' : 'text-muted-foreground/30'}`} />
                                )}
                                <span className={`text-sm ${step.status === 'completed' ? 'text-muted-foreground line-through' : 'font-medium'}`}>
                                    {step.label}
                                </span>
                            </div>
                            {step.status === 'actionable' && step.actionLabel && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 text-xs"
                                    onClick={() => handleAction(step.link)}
                                >
                                    {step.actionLabel} <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {progress < 100 && (
                    <Button className="w-full" onClick={() => {
                        const nextStep = steps.find(s => s.status === 'actionable' || s.status === 'pending');
                        if (nextStep?.link) navigate(nextStep.link);
                    }}>
                        Finish Onboarding
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
