import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MoreHorizontal } from "lucide-react";

interface TeamAssignmentPanelProps {
    team: any[];
}

export function TeamAssignmentPanel({ team }: TeamAssignmentPanelProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Project Team</h2>
                <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Member
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => (
                    <Card key={member.id}>
                        <CardContent className="p-6 flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <h3 className="font-medium leading-none">{member.name}</h3>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
