import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, UserPlus, Ticket } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        {
            label: "New Project",
            icon: Plus,
            onClick: () => navigate('/client/projects'), // Ideally opens a modal or specific 'new' route
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
            onClick: () => navigate('/client/team'), // Ideally opens invite modal
            variant: "outline" as const
        },
        {
            label: "Raise Ticket",
            icon: Ticket,
            onClick: () => navigate('/client/support'), // Ideally opens new ticket modal
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
