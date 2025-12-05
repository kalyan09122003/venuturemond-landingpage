import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, FileText, Send } from "lucide-react";

interface DeliverableCardProps {
    deliverable: any;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export function DeliverableCard({ deliverable, onApprove, onReject }: DeliverableCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-500/10 text-green-600 border-green-200';
            case 'Rejected': return 'bg-red-500/10 text-red-600 border-red-200';
            case 'Sent for Review': return 'bg-amber-500/10 text-amber-600 border-amber-200';
            default: return 'bg-secondary text-secondary-foreground';
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className={getStatusColor(deliverable.status)}>
                        {deliverable.status}
                    </Badge>
                    {deliverable.status === 'Approved' && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                </div>
                <CardTitle className="text-lg mt-2">{deliverable.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Due: {deliverable.dueDate}</span>
                </div>
                {deliverable.submittedAt && (
                    <div className="p-3 bg-secondary/50 rounded-md flex items-center gap-3">
                        <div className="p-2 bg-background rounded border">
                            <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">Deliverable_v1.pdf</p>
                            <p className="text-xs text-muted-foreground">Submitted {new Date(deliverable.submittedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-0">
                {deliverable.status === 'Sent for Review' ? (
                    <div className="flex w-full gap-2">
                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            size="sm"
                            onClick={() => onApprove(deliverable.id)}
                        >
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            size="sm"
                            onClick={() => onReject(deliverable.id)}
                        >
                            <XCircle className="h-4 w-4 mr-2" /> Changes
                        </Button>
                    </div>
                ) : deliverable.status === 'Draft' ? (
                    <Button className="w-full" variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" /> Send for Review
                    </Button>
                ) : (
                    <div className="w-full text-center text-xs text-muted-foreground">
                        {deliverable.status === 'Approved' ? (
                            <span>Approved by {deliverable.approvedBy} on {new Date(deliverable.approvedAt).toLocaleDateString()}</span>
                        ) : (
                            <span>Revision requested</span>
                        )}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
