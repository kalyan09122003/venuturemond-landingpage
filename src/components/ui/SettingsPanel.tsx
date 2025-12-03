import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationList } from "@/components/ui/IntegrationList";
import { Copy, Eye, EyeOff } from "lucide-react";

export function SettingsPanel() {
    const [apiKey, setApiKey] = useState('sk_test_51Mz...');
    const [showKey, setShowKey] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [mfa, setMfa] = useState(false);

    return (
        <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue="john@example.com" disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage how you receive updates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                            </div>
                            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>API Keys</CardTitle>
                        <CardDescription>Manage your API keys for external access.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Secret Key</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={showKey ? 'sk_test_51Mz9283472983472938472938' : apiKey}
                                    readOnly
                                    type={showKey ? "text" : "password"}
                                />
                                <Button variant="outline" size="icon" onClick={() => setShowKey(!showKey)}>
                                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText('sk_test_51Mz9283472983472938472938')}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button variant="outline">Roll Key</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>Add an extra layer of security to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Enable 2FA</Label>
                                <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                            </div>
                            <Switch checked={mfa} onCheckedChange={setMfa} />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="integrations" className="mt-6">
                <IntegrationList />
            </TabsContent>
        </Tabs>
    );
}
