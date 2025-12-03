import React, { useEffect, useState } from 'react';
import { ServiceCard } from "@/components/ui/ServiceCard";
import { PlanConfigurator } from "@/components/ui/PlanConfigurator";
import { mockApi } from "@/lib/mockApi";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<{ serviceId: string, planId: string } | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await mockApi.getServices();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();

        // Check local storage for cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.length);
    }, []);

    const handleSelectPlan = (serviceId: string, planId: string) => {
        setSelectedPlan({ serviceId, planId });
    };

    const handleAddToCart = (config: any) => {
        if (!selectedPlan) return;

        const service = services.find(s => s.id === selectedPlan.serviceId);
        const plan = service.plans.find((p: any) => p.id === selectedPlan.planId);

        const cartItem = {
            serviceId: service.id,
            serviceName: service.name,
            planId: plan.id,
            planName: plan.name,
            total: config.total,
            config
        };

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const newCart = [...currentCart, cartItem];
        localStorage.setItem('cart', JSON.stringify(newCart));

        setCartCount(newCart.length);
        setSelectedPlan(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (selectedPlan) {
        const service = services.find(s => s.id === selectedPlan.serviceId);
        const plan = service.plans.find((p: any) => p.id === selectedPlan.planId);

        return (
            <div className="container mx-auto py-8">
                <PlanConfigurator
                    serviceName={service.name}
                    planName={plan.name}
                    basePrice={plan.price}
                    addOns={service.addOns}
                    onAddToCart={handleAddToCart}
                    onCancel={() => setSelectedPlan(null)}
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
                    <p className="text-muted-foreground">Explore our services and find the right plan for you.</p>
                </div>
                <Button variant="outline" className="relative" onClick={() => navigate('/client/checkout')}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                            {cartCount}
                        </Badge>
                    )}
                </Button>
            </div>

            <div className="grid gap-8">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onSelectPlan={handleSelectPlan}
                    />
                ))}
            </div>
        </div>
    );
}
