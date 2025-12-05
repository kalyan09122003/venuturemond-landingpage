import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageSquare, Paperclip } from "lucide-react";
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
    task: any;
    onClick: (task: any) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        data: { task }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50 border-red-200';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
            default: return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClick(task)}>
                <CardHeader className="p-3 pb-0 space-y-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">#{task.id}</span>
                    </div>
                    <CardTitle className="text-sm font-medium leading-tight">
                        {task.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-1.5">
                            {task.assignees.map((userId: string) => (
                                <Avatar key={userId} className="h-5 w-5 border-2 border-background">
                                    <AvatarFallback className="text-[8px]">U</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            {task.comments?.length > 0 && (
                                <div className="flex items-center gap-0.5 text-[10px]">
                                    <MessageSquare className="h-3 w-3" />
                                    <span>{task.comments.length}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-0.5 text-[10px]">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
