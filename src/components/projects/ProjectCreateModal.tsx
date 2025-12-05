import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface ProjectCreateModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (project: any) => void;
    project?: any; // Optional project for editing
}

// Mock users for team assignment
const MOCK_USERS = [
    { id: 'u1', name: 'Kalyan', avatar: '/avatars/kalyan.jpg' },
    { id: 'u2', name: 'Sai', avatar: '/avatars/sai.jpg' },
    { id: 'u3', name: 'Jaswanth', avatar: '/avatars/jaswanth.jpg' },
    { id: 'u4', name: 'Mahesh Varma', avatar: '/avatars/mahesh.jpg' },
];

export function ProjectCreateModal({ open, onClose, onCreate, project }: ProjectCreateModalProps) {
    const [formData, setFormData] = useState({
        name: project?.name || '',
        description: project?.description || '',
        status: project?.status || 'Planning',
        startDate: project?.startDate || '',
        dueDate: project?.dueDate || '',
        budget: project?.budget?.total?.toString() || '',
        estimatedHours: project?.estimatedHours?.toString() || '',
        team: project?.team?.map((m: any) => m.id) || [] as string[]
    });

    // Reset form when opening for create vs edit
    React.useEffect(() => {
        if (open) {
            setFormData({
                name: project?.name || '',
                description: project?.description || '',
                status: project?.status || 'Planning',
                startDate: project?.startDate || '',
                dueDate: project?.dueDate || '',
                budget: project?.budget?.total?.toString() || '',
                estimatedHours: project?.estimatedHours?.toString() || '',
                team: project?.team?.map((m: any) => m.id) || []
            });
        }
    }, [open, project]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Project name is required";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        if (!formData.dueDate) newErrors.dueDate = "Due date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const newProject = {
            ...formData,
            budget: {
                total: Number(formData.budget) || 0,
                spent: 0,
                currency: 'USD'
            },
            estimatedHours: Number(formData.estimatedHours) || 0,
            team: formData.team.map(userId => {
                const user = MOCK_USERS.find(u => u.id === userId);
                return user ? { ...user, role: 'Member' } : null;
            }).filter(Boolean)
        };

        onCreate(newProject);
    };

    const toggleUser = (userId: string) => {
        setFormData(prev => ({
            ...prev,
            team: prev.team.includes(userId)
                ? prev.team.filter(id => id !== userId)
                : [...prev.team, userId]
        }));
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Website Redesign"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Project goals and scope..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <SelectItem value="Planning">Planning</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Team Members</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" className="justify-between">
                                        {formData.team.length > 0
                                            ? `${formData.team.length} selected`
                                            : "Select team"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Search team..." />
                                        <CommandEmpty>No person found.</CommandEmpty>
                                        <CommandGroup>
                                            {MOCK_USERS.map((user) => (
                                                <CommandItem
                                                    key={user.id}
                                                    value={user.name}
                                                    onSelect={() => toggleUser(user.id)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            formData.team.includes(user.id) ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {user.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {formData.team.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.team.map(userId => {
                                        const user = MOCK_USERS.find(u => u.id === userId);
                                        return user ? (
                                            <Badge key={userId} variant="secondary" className="text-xs">
                                                {user.name}
                                            </Badge>
                                        ) : null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal",
                                            !formData.startDate && "text-muted-foreground",
                                            errors.startDate && "border-red-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.startDate ? format(new Date(formData.startDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.startDate ? new Date(formData.startDate) : undefined}
                                        onSelect={(date) => date && setFormData({ ...formData, startDate: date.toISOString() })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal",
                                            !formData.dueDate && "text-muted-foreground",
                                            errors.dueDate && "border-red-500"
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
                            {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="budget">Estimated Budget ($)</Label>
                            <Input
                                id="budget"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="hours">Estimated Hours</Label>
                            <Input
                                id="hours"
                                type="number"
                                value={formData.estimatedHours}
                                onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                        {project ? 'Save Changes' : 'Create Project'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
