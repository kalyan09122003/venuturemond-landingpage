import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CreditCard, CheckSquare, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface PendingAction {
    id: string;
    title: string;
    description: string;
    type: 'approval' | 'payment' | 'task';
    dueDate: string;
    link: string;
}

interface PendingActionsDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actions: PendingAction[];
}

export function PendingActionsDrawer({ open, onOpenChange, actions }: PendingActionsDrawerProps) {
    const navigate = useNavigate();

    const getIcon = (type: string) => {
        switch (type) {
            case 'approval': return <CheckSquare className="h-5 w-5 text-blue-500" />;
            case 'payment': return <CreditCard className="h-5 w-5 text-red-500" />;
            case 'task': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            default: return <AlertCircle className="h-5 w-5" />;
        }
    };

    const handleAction = (link: string) => {
        onOpenChange(false);
        navigate(link);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Pending Actions</SheetTitle>
                    <SheetDescription>
                        You have {actions.length} items requiring your attention.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
                    <div className="space-y-6">
                        {['approval', 'payment', 'task'].map(type => {
                            const typeActions = actions.filter(a => a.type === type);
                            if (typeActions.length === 0) return null;

                            const sectionTitle =
                                type === 'approval' ? 'Approvals' :
                                    type === 'payment' ? 'Invoices & Billing' :
                                        'Tasks & Tickets';

                            return (
                                <div key={type} className="space-y-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{sectionTitle}</h3>
                                    {typeActions.map((action) => (
                                        <div key={action.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1">{getIcon(action.type)}</div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium leading-none">{action.title}</p>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${action.dueDate === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-secondary text-secondary-foreground'
                                                            }`}>
                                                            {action.dueDate}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {action.description}
                                                    </p>
                                                    <div className="pt-2">
                                                        <Button size="sm" variant="outline" className="w-full justify-between" onClick={() => handleAction(action.link)}>
                                                            Take Action <ArrowRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}

                        {actions.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground">
                                No pending actions. You're all caught up!
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
