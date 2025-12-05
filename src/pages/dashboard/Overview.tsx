import React, { useEffect, useState } from 'react';
import { mockApi } from '@/lib/mockApi';
import { StatusBanner } from '@/components/ui/StatusBanner';
import { NotificationsDropdown } from '@/components/ui/NotificationsDropdown';
import { QuickActions } from '@/components/ui/QuickActions';
import { KpiCard } from '@/components/ui/KpiCard';
import { RevenueChart } from '@/components/ui/RevenueChart';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { RecentOrders } from '@/components/ui/RecentOrders';
import { ActivityFeed } from '@/components/ui/ActivityFeed';
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Overview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log("Fetching overview data...");
      const overviewData = await mockApi.getOverviewData();
      console.log("Overview data received:", overviewData);
      setData(overviewData);
    } catch (error) {
      console.error("Error loading overview data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
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
    <div className="container mx-auto p-4 md:p-6 space-y-6">
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
          <KpiCard key={kpi.id} kpi={kpi} />
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
    </div>
  );
}
