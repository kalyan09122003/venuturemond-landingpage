import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Upload, UserPlus } from "lucide-react";

interface Activity {
    id: string;
    type: 'order' | 'invoice' | 'file' | 'user';
    description: string;
    time: string;
}

const mockActivities: Activity[] = [
    { id: '1', type: 'order', description: 'Order #ORD-2024-001 completed provisioning', time: '2 hours ago' },
    { id: '2', type: 'file', description: 'New file "design_v2.fig" uploaded to Website Redesign', time: '4 hours ago' },
    { id: '3', type: 'invoice', description: 'Invoice #INV-2024-002 paid successfully', time: 'Yesterday' },
    { id: '4', type: 'user', description: 'Mike Johnson joined the team', time: '2 days ago' },
];

export function ActivityFeed() {
    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case 'invoice': return <FileText className="h-4 w-4 text-blue-500" />;
            case 'file': return <Upload className="h-4 w-4 text-orange-500" />;
            case 'user': return <UserPlus className="h-4 w-4 text-purple-500" />;
            default: return <CheckCircle2 className="h-4 w-4" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                            <div className="mt-1 bg-muted p-1.5 rounded-full">
                                {getIcon(activity.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
