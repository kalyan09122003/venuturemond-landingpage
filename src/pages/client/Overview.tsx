import React, { useEffect, useState } from 'react';
import { mockApi } from '@/lib/mockApi';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { QuickActions } from '@/components/ui/QuickActions';
import { KpiCard } from '@/components/ui/KpiCard';
import { RevenueChart } from '@/components/ui/RevenueChart';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { RecentOrders } from '@/components/ui/RecentOrders';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { PendingActionsDrawer } from '@/components/ui/PendingActionsDrawer';
import { NotificationsDropdown } from '@/components/ui/NotificationsDropdown';
import { ProjectCreateModal } from '@/components/projects/ProjectCreateModal';
import { InviteModal } from '@/components/ui/InviteModal';
import { CreateTicketModal } from '@/components/support/CreateTicketModal';
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { PriceBadge } from '@/components/services/PriceBadge';

export default function Overview() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Modal states
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const overviewData = await mockApi.getOverviewData();

            const transformedKpis = overviewData.kpis.map((kpi: any) => {
                if (typeof kpi.value === 'string' && kpi.value.includes('$')) {
                    // Extract numeric value
                    const numericValue = parseFloat(kpi.value.replace(/[^0-9.-]+/g, ""));
                    return {
                        ...kpi,
                        value: <PriceBadge amount={numericValue} size="lg" />
                    };
                }
                return kpi;
            });

            setData({ ...overviewData, kpis: transformedKpis });
        } catch (error) {
            console.error("Failed to load overview data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKpiClick = (link: string) => {
        if (link === 'drawer:pending-actions') {
            setIsDrawerOpen(true);
        } else {
            navigate(link);
        }
    };

    const handleQuickAction = (action: 'create-project' | 'invite-team' | 'raise-ticket') => {
        switch (action) {
            case 'create-project': setIsProjectModalOpen(true); break;
            case 'invite-team': setIsInviteModalOpen(true); break;
            case 'raise-ticket': setIsTicketModalOpen(true); break;
        }
    };

    const handleMarkRead = async (id: string) => {
        // Optimistic update
        const updatedNotifications = await mockApi.markNotificationRead(id);
        setData((prev: any) => ({ ...prev, notifications: updatedNotifications }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
                Failed to load data. Please try refreshing the page.
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-500">
            {/* Top Header Row */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <StatusBanner />
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            {/* Search or other right-aligned items could go here */}
                        </div>
                        <NotificationsDropdown
                            notifications={data.notifications}
                            onMarkRead={handleMarkRead}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                        <p className="text-muted-foreground mt-1">Here's what's happening with your account.</p>
                    </div>
                    <QuickActions onAction={handleQuickAction} />
                </div>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {data.kpis.map((kpi: any) => (
                    <KpiCard key={kpi.id} kpi={kpi} onClick={handleKpiClick} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <RevenueChart data={data.revenueChart} />
                    {/* Recent Orders below Chart according to spec, or Keep Activity? 
                        The spec says "Recent orders card with View all... Recent activity list".
                        Let's keep the layout similar to previous but refined.
                    */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <RecentOrders orders={data.recentOrders} />
                        <ActivityFeed activities={data.activity} />
                    </div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                    <OnboardingProgress
                        progress={data.onboarding.progress}
                        steps={data.onboarding.steps}
                    />
                </div>
            </div>

            {/* Drawers & Modals */}
            <PendingActionsDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                actions={data.pendingActions || []}
            />

            <ProjectCreateModal
                open={isProjectModalOpen}
                onOpenChange={setIsProjectModalOpen}
            />

            <InviteModal
                open={isInviteModalOpen}
                onOpenChange={setIsInviteModalOpen}
            />

            <CreateTicketModal
                open={isTicketModalOpen}
                onOpenChange={setIsTicketModalOpen}
            />
        </div>
    );
}
