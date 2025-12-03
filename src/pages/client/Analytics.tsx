import React, { useEffect, useState } from 'react';
import { AnalyticsPanel } from "@/components/ui/AnalyticsPanel";
import { mockApi } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";

export default function Analytics() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await mockApi.getAnalytics();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleExport = () => {
        // Mock CSV download
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Month,Revenue\n"
            + data.revenue.map((r: any) => `${r.month},${r.amount}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "revenue_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Overview of your business performance.</p>
            </div>

            {data && <AnalyticsPanel data={data} onExport={handleExport} />}
        </div>
    );
}
