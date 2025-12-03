import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShoppingCart, Users, MessageSquare, BarChart, Settings, Folder } from "lucide-react";

export default function Demo() {
    const features = [
        {
            title: "Orders & Invoices",
            description: "Manage service orders and download invoices.",
            icon: CheckCircle2,
            link: "/client/orders",
            color: "text-green-500"
        },
        {
            title: "Services & Checkout",
            description: "Browse catalog, configure plans, and checkout.",
            icon: ShoppingCart,
            link: "/client/services",
            color: "text-blue-500"
        },
        {
            title: "Project Workspace",
            description: "Kanban board, file sharing, and deliverables.",
            icon: Folder,
            link: "/client/projects",
            color: "text-orange-500"
        },
        {
            title: "Team Management",
            description: "Invite members and manage roles.",
            icon: Users,
            link: "/client/team",
            color: "text-purple-500"
        },
        {
            title: "Support & Tickets",
            description: "Create tickets and chat with support.",
            icon: MessageSquare,
            link: "/client/support",
            color: "text-red-500"
        },
        {
            title: "Analytics",
            description: "View revenue trends and usage stats.",
            icon: BarChart,
            link: "/client/analytics",
            color: "text-indigo-500"
        },
        {
            title: "Settings",
            description: "Manage profile, security, and integrations.",
            icon: Settings,
            link: "/client/settings",
            color: "text-gray-500"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Client Dashboard Demo</h1>
                <p className="text-xl text-muted-foreground">
                    Explore the new features implemented for the client dashboard extension.
                    All data is mocked for demonstration purposes.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => window.location.href = feature.link}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors`}>
                                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base mb-4">
                                {feature.description}
                            </CardDescription>
                            <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                                Explore <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
