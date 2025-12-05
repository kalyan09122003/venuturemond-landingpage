import React, { useEffect, useState } from 'react';
import { KanbanBoard } from '@/components/projects/KanbanBoard';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskEditorModal } from '@/components/projects/TaskEditorModal';

export default function ProjectTasks() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (projectId) {
            loadTasks();
        }
    }, [projectId]);

    const loadTasks = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getTasks(projectId);
        setTasks(data);
        setLoading(false);
    };

    const handleTaskMove = async (taskId: string, newStatus: string) => {
        if (!projectId) return;

        // Optimistic update
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

        await mockProjectApi.moveTask(projectId, taskId, newStatus);
    };

    const handleTaskUpdate = async (taskId: string, updates: any) => {
        if (!projectId) return;

        const updated = await mockProjectApi.updateTask(projectId, taskId, updates);
        if (updated) {
            setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
        }
    };

    const handleTaskCreate = async (task: any) => {
        if (!projectId) return;

        const created = await mockProjectApi.createTask(projectId, task);
        if (created) {
            setTasks(prev => [...prev, created]);
        }
    };

    if (loading) return <div>Loading tasks...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => setIsCreating(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                </Button>
            </div>

            <KanbanBoard
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onTaskUpdate={(id, updates) => handleTaskUpdate(id, updates)}
                onTaskCreate={handleTaskCreate}
            />

            <TaskEditorModal
                open={isCreating}
                onOpenChange={setIsCreating}
                onSave={handleTaskCreate}
            />
        </div>
    );
}
