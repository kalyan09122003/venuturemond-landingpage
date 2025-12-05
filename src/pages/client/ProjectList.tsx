import React, { useEffect, useState } from 'react';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Users, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectCreateModal } from '@/components/projects/ProjectCreateModal';

export default function ProjectList() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await mockProjectApi.getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateProject = async (projectData: any) => {
        try {
            const newProject = await mockProjectApi.createProject(projectData);
            setProjects(prev => [newProject, ...prev]);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("Failed to create project", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage your active projects and track progress.</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> New Project
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col hover:shadow-md transition-shadow cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-500" onClick={() => navigate(`/client/projects/${project.id}`)}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className={`mb-2 ${project.status === 'Active' ? 'bg-green-500/10 text-green-600' :
                                        project.status === 'Planning' ? 'bg-blue-500/10 text-blue-600' :
                                            'bg-gray-500/10 text-gray-600'
                                    }`}>
                                    {project.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                            <CardDescription className="line-clamp-2 h-10">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'No date'}</span>
                                </div>
                                <div className="flex -space-x-2">
                                    {project.team && project.team.slice(0, 3).map((member: any) => (
                                        <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    {project.team && project.team.length > 3 && (
                                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] border-2 border-background">
                                            +{project.team.length - 3}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <ProjectCreateModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateProject}
            />
        </div>
    );
}
