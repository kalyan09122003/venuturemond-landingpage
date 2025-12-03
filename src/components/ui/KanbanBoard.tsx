import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Task {
    id: string;
    title: string;
    status: string;
    assignee: string;
}

interface KanbanBoardProps {
    tasks: Task[];
    onTaskMove: (taskId: string, newStatus: string) => void;
}

const SortableTask = ({ task }: { task: Task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3 cursor-grab active:cursor-grabbing">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-3 space-y-2">
                    <p className="text-sm font-medium leading-snug">{task.title}</p>
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">{task.id}</Badge>
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{task.assignee.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const columns = ['todo', 'in-progress', 'done'];

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over) {
            // Find which column the item was dropped into
            const overId = over.id;
            // If dropped on a container (column)
            if (columns.includes(overId)) {
                onTaskMove(active.id, overId);
            }
            // If dropped on another item
            else {
                const overTask = tasks.find(t => t.id === overId);
                if (overTask) {
                    onTaskMove(active.id, overTask.status);
                }
            }
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
                {columns.map((columnId) => (
                    <div key={columnId} className="flex flex-col h-full bg-muted/30 rounded-lg p-4">
                        <h3 className="font-semibold mb-4 capitalize flex items-center justify-between">
                            {columnId.replace('-', ' ')}
                            <Badge variant="secondary" className="ml-2">
                                {tasks.filter(t => t.status === columnId).length}
                            </Badge>
                        </h3>

                        <SortableContext
                            items={tasks.filter(t => t.status === columnId).map(t => t.id)}
                            strategy={verticalListSortingStrategy}
                            id={columnId} // This makes the column itself a droppable zone
                        >
                            <div className="flex-1">
                                {tasks.filter(t => t.status === columnId).map((task) => (
                                    <SortableTask key={task.id} task={task} />
                                ))}
                                {/* Empty placeholder to make column droppable if empty */}
                                {tasks.filter(t => t.status === columnId).length === 0 && (
                                    <div className="h-20 border-2 border-dashed border-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
                                        Drop here
                                    </div>
                                )}
                            </div>
                        </SortableContext>
                    </div>
                ))}
            </div>
            <DragOverlay>
                {activeId ? (
                    <Card className="shadow-lg w-full opacity-80 rotate-2">
                        <CardContent className="p-3">
                            <p className="text-sm font-medium">Moving task...</p>
                        </CardContent>
                    </Card>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
