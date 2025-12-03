import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock } from "lucide-react";

interface Deliverable {
    id: string;
    name: string;
    status: string;
    date: string;
}

interface DeliverableCardProps {
    deliverable: Deliverable;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export function DeliverableCard({ deliverable, onApprove, onReject }: DeliverableCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{deliverable.name}</CardTitle>
                    <Badge variant={
                        deliverable.status === 'approved' ? 'default' :
                            deliverable.status === 'rejected' ? 'destructive' : 'secondary'
                    }>
                        {deliverable.status.replace('_', ' ')}
                    </Badge>
                </div>
                <CardDescription>Submitted on {deliverable.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed">
                    Preview Placeholder
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                {deliverable.status === 'pending_approval' && (
                    <>
                        <Button variant="outline" size="sm" onClick={() => onReject(deliverable.id)} className="text-destructive hover:text-destructive">
                            <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        <Button size="sm" onClick={() => onApprove(deliverable.id)} className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                    </>
                )}
                {deliverable.status === 'approved' && (
                    <p className="text-sm text-green-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" /> Approved
                    </p>
                )}
            </CardFooter>
        </Card>
    );
}
