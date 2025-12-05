import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskEditorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    task?: any;
    onSave: (task: any) => void;
}

export function TaskEditorModal({ open, onOpenChange, task, onSave }: TaskEditorModalProps) {
    const [formData, setFormData] = useState<any>({
        title: '',
        description: '',
        status: 'Todo',
        priority: 'Medium',
        dueDate: new Date().toISOString(),
        assignees: []
    });

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Todo',
                priority: 'Medium',
                dueDate: new Date().toISOString(),
                assignees: []
            });
        }
    }, [task, open]);

    const handleSave = () => {
        onSave({ ...formData, id: task?.id });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{task ? 'Edit Task' : 'Create Task'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Task title"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val) => setFormData({ ...formData, status: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Todo">Todo</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Review">Review</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Priority</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(val) => setFormData({ ...formData, priority: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !formData.dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.dueDate ? format(new Date(formData.dueDate), "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
                                    onSelect={(date) => date && setFormData({ ...formData, dueDate: date.toISOString() })}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Task description..."
                            className="h-32"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
