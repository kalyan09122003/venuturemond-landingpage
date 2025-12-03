import React from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    link?: string;
}

const mockNotifications: Notification[] = [
    { id: '1', title: 'Order Update', message: 'Your order #ORD-2024-001 is now active.', time: '2 mins ago', read: false, link: '/client/orders' },
    { id: '2', title: 'New Invoice', message: 'Invoice #INV-2024-002 is available.', time: '1 hour ago', read: false, link: '/client/invoices' },
    { id: '3', title: 'Ticket Resolved', message: 'Support ticket #TKT-1002 has been resolved.', time: '1 day ago', read: true, link: '/client/support' },
];

export function NotificationsDropdown() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 rounded-full bg-red-500">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                    {mockNotifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="cursor-pointer flex flex-col items-start gap-1 p-3">
                            <div className="flex justify-between w-full">
                                <span className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>
                                    {notification.title}
                                </span>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                        </DropdownMenuItem>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
