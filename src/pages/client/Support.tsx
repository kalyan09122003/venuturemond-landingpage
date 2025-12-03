import React, { useEffect, useState } from 'react';
import { TicketList } from "@/components/ui/TicketList";
import { TicketDetail } from "@/components/ui/TicketDetail";
import { mockApi } from "@/lib/mockApi";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Support() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Form state
    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('medium');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await mockApi.getTickets();
                setTickets(data);
            } catch (error) {
                console.error("Failed to fetch tickets", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newTicket = await mockApi.createTicket({
                subject,
                priority,
                messages: [{ sender: 'user', text: message, time: new Date().toISOString() }],
                slaDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h SLA
            });
            setTickets(prev => [newTicket, ...prev]);
            setIsCreateOpen(false);
            setSubject('');
            setMessage('');
            setPriority('medium');
        } catch (error) {
            console.error("Failed to create ticket", error);
        }
    };

    const handleSendMessage = (text: string) => {
        if (!selectedTicketId) return;

        setTickets(prev => prev.map(t => {
            if (t.id === selectedTicketId) {
                return {
                    ...t,
                    messages: [...t.messages, { sender: 'user', text, time: new Date().toISOString() }]
                };
            }
            return t;
        }));

        // Simulate auto-reply
        setTimeout(() => {
            setTickets(prev => prev.map(t => {
                if (t.id === selectedTicketId) {
                    return {
                        ...t,
                        messages: [...t.messages, {
                            sender: 'support',
                            text: 'Thank you for your message. An agent will review it shortly.',
                            time: new Date().toISOString()
                        }]
                    };
                }
                return t;
            }));
        }, 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (selectedTicketId) {
        const ticket = tickets.find(t => t.id === selectedTicketId);
        if (!ticket) return <div>Ticket not found</div>;
        return (
            <TicketDetail
                ticket={ticket}
                onBack={() => setSelectedTicketId(null)}
                onSendMessage={handleSendMessage}
            />
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support</h1>
                    <p className="text-muted-foreground">Get help with your services and orders.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> New Ticket
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleCreateTicket}>
                            <DialogHeader>
                                <DialogTitle>Create Support Ticket</DialogTitle>
                                <DialogDescription>
                                    Describe your issue and we'll get back to you as soon as possible.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief description of the issue"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Detailed explanation..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Submit Ticket</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <TicketList tickets={tickets} onTicketClick={setSelectedTicketId} />
        </div>
    );
}
