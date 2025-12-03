import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MobileQuickActions() {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-4 md:hidden flex justify-around items-center pb-safe">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2" onClick={() => navigate('/client/projects')}>
                <Plus className="h-5 w-5" />
                <span className="text-[10px]">New Project</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2" onClick={() => navigate('/client/support')}>
                <MessageSquare className="h-5 w-5" />
                <span className="text-[10px]">Support</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2" onClick={() => navigate('/client/orders')}>
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-[10px]">Approve</span>
            </Button>
        </div>
    );
}
