import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server, Calendar, Activity } from "lucide-react";
import type { Service } from "@/lib/mock-data";

interface ServicesListProps {
  services: Service[];
  loading?: boolean;
}

const statusVariants = {
  active: "success",
  provisioning: "warning",
  suspended: "destructive",
} as const;

export function ServicesList({ services, loading }: ServicesListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 skeleton rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => {
        const usagePercent = (service.usage / service.usageLimit) * 100;
        
        return (
          <Card key={service.id} variant="glass" className="hover:border-primary/30 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="text-primary" size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    <Badge variant={statusVariants[service.status]} className="mt-1">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Activity size={14} />
                    Usage
                  </span>
                  <span>
                    {service.usage.toLocaleString()} / {service.usageLimit.toLocaleString()}
                  </span>
                </div>
                <Progress value={usagePercent} className="h-2" />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>Renews {new Date(service.renewalDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
