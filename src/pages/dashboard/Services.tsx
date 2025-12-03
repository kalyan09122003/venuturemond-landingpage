import { useEffect, useState } from "react";
import { ServicesList } from "@/components/dashboard/ServicesList";
import { mockServices, type Service } from "@/lib/mock-data";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Services & Usage</h1>
        <p className="text-muted-foreground">Monitor your active services and usage metrics.</p>
      </div>

      <ServicesList services={services} loading={loading} />
    </div>
  );
}
