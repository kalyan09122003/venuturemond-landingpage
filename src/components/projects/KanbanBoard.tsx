import React, { useState } from 'react';
import { DndContext, DragOverlay, useDroppable, closestCorners } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskEditorModal } from './TaskEditorModal';

interface KanbanBoardProps {
    tasks: any[];
    onTaskMove: (taskId: string, newStatus: string) => void;
    onTaskUpdate: (taskId: string, updates: any) => void;
    onTaskCreate: (task: any) => void;
}

const COLUMNS = ['Todo', 'In Progress', 'Review', 'Done'];

function KanbanColumn({ status, tasks, onTaskClick }: { status: string, tasks: any[], onTaskClick: (task: any) => void }) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div ref={setNodeRef} className="flex-1 min-w-[280px] bg-secondary/30 rounded-lg p-3 flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between px-1">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    {status} <span className="ml-1 text-xs bg-background px-1.5 py-0.5 rounded-full border">{tasks.length}</span>
                </h3>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto min-h-[100px]">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={onTaskClick} />
                ))}
            </div>
        </div>
    );
}

export function KanbanBoard({ tasks, onTaskMove, onTaskUpdate, onTaskCreate }: KanbanBoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<any | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            // Check if dropped on a column
            if (COLUMNS.includes(over.id)) {
                onTaskMove(active.id, over.id);
            }
        }
        setActiveId(null);
    };

    const activeTask = tasks.find(t => t.id === activeId);

    return (
        <div className="h-[calc(100vh-250px)] overflow-x-auto pb-4">
            <div className="flex gap-4 h-full min-w-[1000px]">
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    {COLUMNS.map(column => (
                        <KanbanColumn
                            key={column}
                            status={column}
                            tasks={tasks.filter(t => t.status === column)}
                            onTaskClick={setEditingTask}
                        />
                    ))}
                    <DragOverlay>
                        {activeTask ? <TaskCard task={activeTask} onClick={() => { }} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>

            <TaskEditorModal
                open={!!editingTask || isCreating}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditingTask(null);
                        setIsCreating(false);
                    }
                }}
                task={editingTask}
                onSave={(task) => {
                    if (isCreating) {
                        onTaskCreate(task);
                    } else {
                        onTaskUpdate(task.id, task);
                    }
                    setEditingTask(null);
                    setIsCreating(false);
                }}
            />
        </div>
    );
}
