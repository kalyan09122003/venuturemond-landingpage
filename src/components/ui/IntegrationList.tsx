import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Plug, ExternalLink } from "lucide-react";

interface Integration {
    id: string;
    name: string;
    description: string;
    connected: boolean;
    icon: string;
}

const mockIntegrations: Integration[] = [
    { id: 'slack', name: 'Slack', description: 'Receive notifications in your Slack channels.', connected: true, icon: 'slack' },
    { id: 'github', name: 'GitHub', description: 'Sync issues and pull requests.', connected: false, icon: 'github' },
    { id: 'google', name: 'Google Drive', description: 'Access your files directly.', connected: false, icon: 'drive' },
    { id: 'stripe', name: 'Stripe', description: 'Manage payments and subscriptions.', connected: true, icon: 'stripe' },
];

export function IntegrationList() {
    const [integrations, setIntegrations] = useState(mockIntegrations);

    const toggleConnection = (id: string) => {
        setIntegrations(prev => prev.map(i =>
            i.id === id ? { ...i, connected: !i.connected } : i
        ));
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
                <Card key={integration.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                    <Plug className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                                    {integration.connected && (
                                        <Badge variant="outline" className="mt-1 text-green-600 border-green-200 bg-green-50">
                                            Connected
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{integration.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant={integration.connected ? "outline" : "default"}
                            className="w-full"
                            onClick={() => toggleConnection(integration.id)}
                        >
                            {integration.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
