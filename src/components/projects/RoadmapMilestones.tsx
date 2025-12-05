import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

interface RoadmapMilestonesProps {
    project: any;
}

export function RoadmapMilestones({ project }: RoadmapMilestonesProps) {
    // Mock milestones based on project dates if not present
    const milestones = [
        {
            id: 'm1',
            title: 'Phase 1: Planning & Design',
            startDate: project.startDate,
            endDate: '2024-02-15',
            status: 'Completed',
            progress: 100,
            tasks: 5,
            completedTasks: 5
        },
        {
            id: 'm2',
            title: 'Phase 2: Development',
            startDate: '2024-02-16',
            endDate: '2024-04-01',
            status: 'In Progress',
            progress: 45,
            tasks: 12,
            completedTasks: 5
        },
        {
            id: 'm3',
            title: 'Phase 3: Testing & Launch',
            startDate: '2024-04-02',
            endDate: project.dueDate,
            status: 'Pending',
            progress: 0,
            tasks: 8,
            completedTasks: 0
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Project Roadmap</h2>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">Completed</Badge>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600">In Progress</Badge>
                    <Badge variant="outline" className="bg-gray-500/10 text-gray-600">Pending</Badge>
                </div>
            </div>

            <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
                {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="relative pl-8">
                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-background ${milestone.status === 'Completed' ? 'border-green-500 text-green-500' :
                                milestone.status === 'In Progress' ? 'border-blue-500 text-blue-500' :
                                    'border-muted-foreground text-muted-foreground'
                            }`}>
                            {milestone.status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                        </div>

                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base">{milestone.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">{milestone.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{milestone.completedTasks}/{milestone.tasks} Tasks Completed</span>
                                        <span className="font-medium">{milestone.progress}%</span>
                                    </div>
                                    <Progress value={milestone.progress} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
