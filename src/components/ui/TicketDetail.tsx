import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
    sender: 'user' | 'support';
    text: string;
    time: string;
}

interface Ticket {
    id: string;
    subject: string;
    status: string;
    priority: string;
    slaDue: string;
    messages: Message[];
}

interface TicketDetailProps {
    ticket: Ticket;
    onBack: () => void;
    onSendMessage: (text: string) => void;
}

export function TicketDetail({ ticket, onBack, onSendMessage }: TicketDetailProps) {
    const [newMessage, setNewMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const due = new Date(ticket.slaDue).getTime();
            const now = new Date().getTime();
            const diff = due - now;

            if (diff <= 0) {
                setTimeLeft('SLA Breached');
            } else {
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours}h ${minutes}m`);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
        return () => clearInterval(timer);
    }, [ticket.slaDue]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="space-y-6 h-[calc(100vh-200px)] flex flex-col">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="gap-2 pl-0">
                    <ArrowLeft className="h-4 w-4" /> Back to Tickets
                </Button>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm font-medium ${timeLeft === 'SLA Breached' ? 'text-destructive' : 'text-primary'}`}>
                        SLA: {timeLeft}
                    </span>
                </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="border-b bg-muted/20">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{ticket.subject}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Ticket #{ticket.id}</p>
                        </div>
                        <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'} className="capitalize">
                            {ticket.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {ticket.messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className={msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                                        {msg.sender === 'user' ? 'ME' : 'SP'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <span className="text-[10px] opacity-70 mt-1 block text-right">
                                        {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="border-t p-4">
                    <form onSubmit={handleSend} className="flex w-full gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={ticket.status === 'resolved'}
                        />
                        <Button type="submit" disabled={!newMessage.trim() || ticket.status === 'resolved'}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
