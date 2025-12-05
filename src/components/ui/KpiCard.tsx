import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const iconMap: any = {
    DollarSign,
    CreditCard,
    Zap,
    AlertCircle,
    CheckCircle2
};

interface KpiCardProps {
    kpi: {
        id: string;
        label: string;
        value: React.ReactNode;
        delta: string | null;
        deltaType: 'increase' | 'decrease' | 'neutral';
        icon: string;
        link?: string;
    };
    onClick?: (link: string) => void;
}

export function KpiCard({ kpi, onClick }: KpiCardProps) {
    const Icon = iconMap[kpi.icon] || AlertCircle;
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick && kpi.link) {
            onClick(kpi.link);
        } else if (kpi.link) {
            navigate(kpi.link);
        }
    };

    return (
        <Card
            className={`hover:shadow-lg transition-all duration-200 cursor-pointer group`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {kpi.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                {kpi.delta && (
                    <p className={`text-xs ${kpi.deltaType === 'increase' ? 'text-green-600' :
                        kpi.deltaType === 'decrease' ? 'text-red-600' :
                            'text-muted-foreground'
                        }`}>
                        {kpi.delta} from last month
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
