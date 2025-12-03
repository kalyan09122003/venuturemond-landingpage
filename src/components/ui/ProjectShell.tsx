import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar } from "lucide-react";

interface Project {
    id: string;
    name: string;
    status: string;
    progress: number;
    startDate: string;
    dueDate: string;
}

interface ProjectShellProps {
    project: Project;
    children: React.ReactNode;
}

export function ProjectShell({ project, children }: ProjectShellProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Due: {project.dueDate}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Started: {project.startDate}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex flex-col items-end gap-1 w-full md:w-48">
                        <div className="flex justify-between w-full text-xs">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                    </div>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                        {project.status}
                    </Badge>
                </div>
            </div>

            <Separator />

            {children}
        </div>
    );
}
