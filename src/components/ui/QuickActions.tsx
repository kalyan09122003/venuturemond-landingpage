import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, UserPlus, Ticket } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
    onAction: (action: 'create-project' | 'invite-team' | 'raise-ticket') => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
    const navigate = useNavigate();

    const actions = [
        {
            label: "New Project",
            icon: Plus,
            onClick: () => onAction('create-project'),
            variant: "default" as const
        },
        {
            label: "Buy Service",
            icon: ShoppingBag,
            onClick: () => navigate('/client/services'),
            variant: "outline" as const
        },
        {
            label: "Invite Team",
            icon: UserPlus,
            onClick: () => onAction('invite-team'),
            variant: "outline" as const
        },
        {
            label: "Raise Ticket",
            icon: Ticket,
            onClick: () => onAction('raise-ticket'),
            variant: "outline" as const
        }
    ];

    return (
        <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
                <Button
                    key={action.label}
                    variant={action.variant}
                    className={action.variant === 'default' ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md' : 'bg-white hover:bg-gray-50'}
                    onClick={action.onClick}
                >
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                </Button>
            ))}
        </div>
    );
}
