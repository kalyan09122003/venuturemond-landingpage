import { useEffect, useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { fetchDashboardOverview, type DashboardOverview } from "@/lib/mock-data";
import { DollarSign, CreditCard, Zap, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardOverview().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  const handleOnboardingAction = (stepId: string) => {
    navigate("/onboarding");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Recurring Revenue"
          value={data?.mrr || 0}
          change={data?.mrrChange}
          icon={DollarSign}
          format="currency"
          loading={loading}
        />
        <KPICard
          title="Balance Due"
          value={data?.balanceDue || 0}
          icon={CreditCard}
          format="currency"
          loading={loading}
        />
        <KPICard
          title="Active Subscriptions"
          value={data?.activeSubscriptions || 0}
          icon={Zap}
          loading={loading}
        />
        <KPICard
          title="Onboarding Progress"
          value={`${data?.onboardingProgress || 0}%`}
          icon={CheckCircle2}
          loading={loading}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={data?.revenueData || []} loading={loading} />
          <RecentOrders orders={data?.recentOrders || []} loading={loading} />
        </div>

        {/* Right column - 1/3 width */}
        <div className="space-y-6">
          <OnboardingChecklist
            progress={data?.onboardingProgress || 0}
            steps={data?.onboardingSteps || []}
            loading={loading}
            onAction={handleOnboardingAction}
          />
        </div>
      </div>
    </div>
  );
}
