import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, MoreHorizontal, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectHeaderProps {
    project: any;
    onAction: (action: string) => void;
}

export function ProjectHeader({ project, onAction }: ProjectHeaderProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
            case 'Planning': return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20';
            case 'Completed': return 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20';
            default: return 'bg-secondary text-secondary-foreground';
        }
    };

    return (
        <div className="space-y-4 pb-6 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                            {project.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Due {project.dueDate}</span>
                        </div>
                        {project.budget && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{Math.round((project.budget.spent / project.budget.total) * 100)}% Budget Used</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => onAction('add_task')}>
                        <Plus className="h-4 w-4 mr-2" /> Add Task
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onAction('upload_file')}>
                                Upload File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAction('create_deliverable')}>
                                Create Deliverable
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAction('schedule_meeting')}>
                                Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAction('edit_project')}>
                                Edit Project
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
            </div>
        </div>
    );
}
