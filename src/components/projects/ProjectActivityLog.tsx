import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, CheckCircle2, FileText, MessageSquare, Calendar } from "lucide-react";

interface ProjectActivityLogProps {
    activity: any[];
}

export function ProjectActivityLog({ activity }: ProjectActivityLogProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'task_completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case 'file_uploaded': return <FileText className="h-4 w-4 text-blue-500" />;
            case 'comment_added': return <MessageSquare className="h-4 w-4 text-amber-500" />;
            case 'meeting_scheduled': return <Calendar className="h-4 w-4 text-purple-500" />;
            default: return <Activity className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                        {activity.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>
                        ) : (
                            activity.map((item) => (
                                <div key={item.id} className="flex gap-3 text-sm">
                                    <div className="mt-0.5 bg-secondary p-1.5 rounded-full h-fit">
                                        {getIcon(item.type)}
                                    </div>
                                    <div className="space-y-1">
                                        <p>{item.text}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
