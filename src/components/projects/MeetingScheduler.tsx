import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Clock, Video, Plus, Users } from "lucide-react";

interface MeetingSchedulerProps {
    meetings: any[];
    onSchedule: (meeting: any) => void;
}

export function MeetingScheduler({ meetings, onSchedule }: MeetingSchedulerProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newMeeting, setNewMeeting] = useState({
        title: '',
        date: '',
        time: '',
        duration: 60,
        attendees: []
    });

    const handleSchedule = () => {
        onSchedule({
            ...newMeeting,
            date: `${newMeeting.date}T${newMeeting.time}`,
            attendees: ['You', 'Client'] // Mock attendees
        });
        setIsDialogOpen(false);
        setNewMeeting({ title: '', date: '', time: '', duration: 60, attendees: [] });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Meetings</h2>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Schedule Meeting
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {meetings.map((meeting) => (
                    <Card key={meeting.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{meeting.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(meeting.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({meeting.duration} min)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.attendees.length} Attendees</span>
                            </div>
                            <Button variant="outline" className="w-full mt-2" size="sm">
                                <Video className="h-4 w-4 mr-2" /> Join Meeting
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule a Meeting</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input
                                value={newMeeting.title}
                                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                                placeholder="Meeting title"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Date</Label>
                                <Input
                                    type="date"
                                    value={newMeeting.date}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Time</Label>
                                <Input
                                    type="time"
                                    value={newMeeting.time}
                                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSchedule}>Schedule</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
