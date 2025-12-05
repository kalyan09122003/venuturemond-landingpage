import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart, Ticket, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Activity {
    id: string;
    type: 'file' | 'order' | 'invoice' | 'team' | 'ticket';
    text: string;
    timestamp: string;
    link: string;
}

interface ActivityFeedProps {
    activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'all' | 'order' | 'file' | 'ticket'>('all');

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.type === filter || (filter === 'order' && a.type === 'invoice'));

    const getIcon = (type: string) => {
        switch (type) {
            case 'file': return <FileText className="h-4 w-4 text-blue-500" />;
            case 'order': return <ShoppingCart className="h-4 w-4 text-purple-500" />;
            case 'invoice': return <FileText className="h-4 w-4 text-green-500" />;
            case 'team': return <Users className="h-4 w-4 text-orange-500" />;
            case 'ticket': return <Ticket className="h-4 w-4 text-red-500" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                <div className="flex gap-2">
                    {['all', 'order', 'file'].map((f) => (
                        <button
                            key={f}
                            className={`text-xs font-medium pb-1 transition-colors ${filter === f
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            onClick={() => setFilter(f as any)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                    {filteredActivities.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                    ) : (
                        filteredActivities.map((activity) => (
                            <div key={activity.id} className="relative flex gap-4 items-start group">
                                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border shadow-sm group-hover:border-primary/50 transition-colors">
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex flex-col gap-1 pt-1.5 cursor-pointer" onClick={() => navigate(activity.link)}>
                                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                                        {activity.text}
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                        {activity.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
