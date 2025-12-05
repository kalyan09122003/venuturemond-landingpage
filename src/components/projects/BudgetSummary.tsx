import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Clock, AlertTriangle } from "lucide-react";
import { PriceBadge } from "../services/PriceBadge";

interface BudgetSummaryProps {
    budget: any;
}

export function BudgetSummary({ budget }: BudgetSummaryProps) {
    if (!budget) return <div>No budget data available.</div>;

    const percentage = Math.round((budget.spent / budget.total) * 100);
    const remaining = budget.total - budget.spent;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <PriceBadge amount={budget.total} size="lg" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Spent</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <PriceBadge amount={budget.spent} size="lg" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {percentage}% of total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            <PriceBadge amount={remaining} size="lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm items-center">
                        <span>{percentage}% Used</span>
                        <div className="flex items-center gap-1">
                            <PriceBadge amount={remaining} size="sm" />
                            <span>Remaining</span>
                        </div>
                    </div>
                    <Progress value={percentage} className={`h-4 ${percentage > 90 ? 'bg-red-100' : ''}`} />
                    {percentage > 80 && (
                        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Warning: You have used over 80% of the allocated budget.</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
