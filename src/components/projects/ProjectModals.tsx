import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

interface FileUploadModalProps {
    open: boolean;
    onClose: () => void;
    onUpload: (file: any) => void;
}

export function FileUploadModal({ open, onClose, onUpload }: FileUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!file) return;
        onUpload({
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            type: file.type.split('/')[1] || 'unknown',
            uploadedBy: 'You',
            version: 1
        });
        setFile(null);
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center gap-2">
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:underline">
                            {file ? file.name : "Choose a file to upload"}
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleUpload} disabled={!file}>Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface DeliverableCreateModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (deliverable: any) => void;
}

export function DeliverableCreateModal({ open, onClose, onCreate }: DeliverableCreateModalProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleCreate = () => {
        onCreate({
            title,
            dueDate,
            status: 'Draft'
        });
        setTitle('');
        setDueDate('');
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Deliverable</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Deliverable title" />
                    </div>
                    <div className="grid gap-2">
                        <Label>Due Date</Label>
                        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={!title || !dueDate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface MeetingCreateModalProps {
    open: boolean;
    onClose: () => void;
    onSchedule: (meeting: any) => void;
}

export function MeetingCreateModal({ open, onClose, onSchedule }: MeetingCreateModalProps) {
    const [meeting, setMeeting] = useState({
        title: '',
        date: '',
        time: '',
        duration: 60
    });

    const handleSchedule = () => {
        onSchedule({
            ...meeting,
            date: `${meeting.date}T${meeting.time}`,
            attendees: ['You', 'Client']
        });
        setMeeting({ title: '', date: '', time: '', duration: 60 });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Schedule Meeting</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input value={meeting.title} onChange={(e) => setMeeting({ ...meeting, title: e.target.value })} placeholder="Meeting title" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Date</Label>
                            <Input type="date" value={meeting.date} onChange={(e) => setMeeting({ ...meeting, date: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Time</Label>
                            <Input type="time" value={meeting.time} onChange={(e) => setMeeting({ ...meeting, time: e.target.value })} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSchedule} disabled={!meeting.title || !meeting.date || !meeting.time}>Schedule</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
