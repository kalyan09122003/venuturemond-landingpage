import React, { useEffect, useState } from 'react';
import { TeamList } from "@/components/ui/TeamList";
import { InviteModal } from "@/components/ui/InviteModal";
import { mockApi } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Team() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [seatUsage, setSeatUsage] = useState({ used: 0, total: 5 }); // Mock seat limit

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await mockApi.getUsers();
                setUsers(data);
                setSeatUsage({ used: data.length, total: 5 });
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleInvite = async (email: string, role: string) => {
        try {
            const newUser = await mockApi.inviteUser(email, role);
            setUsers(prev => [...prev, newUser]);
            setSeatUsage(prev => ({ ...prev, used: prev.used + 1 }));
        } catch (error) {
            console.error("Failed to invite user", error);
        }
    };

    const handleRemoveUser = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
        setSeatUsage(prev => ({ ...prev, used: prev.used - 1 }));
    };

    const handleUpdateRole = (id: string, role: string) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                    <p className="text-muted-foreground">Manage your team members and their access roles.</p>
                </div>
                <InviteModal onInvite={handleInvite} />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TeamList
                            users={users}
                            onRemoveUser={handleRemoveUser}
                            onUpdateRole={handleUpdateRole}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seat Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>{seatUsage.used} used</span>
                            <span>{seatUsage.total} available</span>
                        </div>
                        <Progress value={(seatUsage.used / seatUsage.total) * 100} />
                        <p className="text-sm text-muted-foreground">
                            You are using {seatUsage.used} out of {seatUsage.total} seats included in your plan.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
