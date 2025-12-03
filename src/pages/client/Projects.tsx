import React, { useEffect, useState } from 'react';
import { ProjectShell } from "@/components/ui/ProjectShell";
import { KanbanBoard } from "@/components/ui/KanbanBoard";
import { FileBrowser } from "@/components/ui/FileBrowser";
import { DeliverableCard } from "@/components/ui/DeliverableCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApi } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";

export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await mockApi.getProjects();
                setProjects(data);
                if (data.length > 0) {
                    setActiveProjectId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleTaskMove = (taskId: string, newStatus: string) => {
        if (!activeProjectId) return;

        setProjects(prev => prev.map(p => {
            if (p.id === activeProjectId) {
                return {
                    ...p,
                    tasks: p.tasks.map((t: any) =>
                        t.id === taskId ? { ...t, status: newStatus } : t
                    )
                };
            }
            return p;
        }));
    };

    const handleFileUpload = (file: any) => {
        if (!activeProjectId) return;

        setProjects(prev => prev.map(p => {
            if (p.id === activeProjectId) {
                return {
                    ...p,
                    files: [...p.files, { id: `file-${Date.now()}`, ...file }]
                };
            }
            return p;
        }));
    };

    const handleDeliverableAction = (id: string, action: 'approved' | 'rejected') => {
        if (!activeProjectId) return;

        setProjects(prev => prev.map(p => {
            if (p.id === activeProjectId) {
                return {
                    ...p,
                    deliverables: p.deliverables.map((d: any) =>
                        d.id === id ? { ...d, status: action } : d
                    )
                };
            }
            return p;
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const activeProject = projects.find(p => p.id === activeProjectId);

    if (!activeProject) {
        return <div>No projects found.</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage your active projects and deliverables.</p>
                </div>
                <select
                    className="w-full sm:w-auto border rounded-md p-2 bg-background"
                    value={activeProjectId || ''}
                    onChange={(e) => setActiveProjectId(e.target.value)}
                >
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <ProjectShell project={activeProject}>
                <Tabs defaultValue="tasks" className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto">
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tasks" className="mt-6">
                        <KanbanBoard tasks={activeProject.tasks} onTaskMove={handleTaskMove} />
                    </TabsContent>

                    <TabsContent value="files" className="mt-6">
                        <FileBrowser files={activeProject.files} onUpload={handleFileUpload} />
                    </TabsContent>

                    <TabsContent value="deliverables" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {activeProject.deliverables.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                                    No deliverables yet.
                                </div>
                            ) : (
                                activeProject.deliverables.map((d: any) => (
                                    <DeliverableCard
                                        key={d.id}
                                        deliverable={d}
                                        onApprove={(id) => handleDeliverableAction(id, 'approved')}
                                        onReject={(id) => handleDeliverableAction(id, 'rejected')}
                                    />
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </ProjectShell>
        </div>
    );
}
