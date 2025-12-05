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
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function Overview() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const overviewData = await mockApi.getOverviewData();
            setData(overviewData);
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
        <div className="container mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="w-full md:w-auto">
                    <StatusBanner />
                </div>
            </div>

            {/* Welcome & Quick Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                    <p className="text-muted-foreground mt-1">Here's what's happening with your account.</p>
                </div>
                <QuickActions />
            </div>

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {data.kpis.map((kpi: any) => (
                    <KpiCard key={kpi.id} kpi={kpi} onClick={handleKpiClick} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <RevenueChart data={data.revenueChart} />
                    <RecentOrders orders={data.recentOrders} />
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                    <OnboardingProgress
                        progress={data.onboarding.progress}
                        steps={data.onboarding.steps}
                    />
                    <ActivityFeed activities={data.activity} />
                </div>
            </div>

            <PendingActionsDrawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                actions={data.pendingActions || []}
            />
        </div>
    );
}
