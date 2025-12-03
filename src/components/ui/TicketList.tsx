import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MessageSquare } from "lucide-react";

interface Ticket {
    id: string;
    subject: string;
    status: string;
    priority: string;
    created: string;
    slaDue: string;
}

interface TicketListProps {
    tickets: Ticket[];
    onTicketClick: (id: string) => void;
}

export function TicketList({ tickets, onTicketClick }: TicketListProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive';
            case 'medium': return 'default'; // or warning color if available
            case 'low': return 'secondary';
            default: return 'secondary';
        }
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                No tickets found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        tickets.map((ticket) => (
                            <TableRow
                                key={ticket.id}
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => onTicketClick(ticket.id)}
                            >
                                <TableCell className="font-medium flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    {ticket.id}
                                </TableCell>
                                <TableCell>{ticket.subject}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize">
                                        {ticket.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getPriorityColor(ticket.priority) as any} className="capitalize">
                                        {ticket.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">
                                    {new Date(ticket.created).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
