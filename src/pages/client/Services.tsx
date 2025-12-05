import React, { useState, useEffect } from 'react';
import { Category, Plan, PlanConfig, PriceBreakdown, mockServicesApi } from '@/lib/mockServicesApi';
import { ServiceCategory } from '@/components/services/ServiceCategory';
import { FiltersBar } from '@/components/services/FiltersBar';
import { PlanDetailModal } from '@/components/services/PlanDetailModal';
import { PlanConfigurator } from '@/components/services/PlanConfigurator';
import { ComparePlansModal } from '@/components/services/ComparePlansModal';
import { CartIconWithCount } from '@/components/services/CartIconWithCount';
import { useAddToCartToast } from '@/components/services/AddToCartToast';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Services() {
    const navigate = useNavigate();
    const { showAddToCartToast } = useAddToCartToast();

    // Data State
    const [categories, setCategories] = useState<Category[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [detailPlan, setDetailPlan] = useState<Plan | null>(null);
    const [configPlan, setConfigPlan] = useState<Plan | null>(null);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // Cart & Compare State
    const [cartCount, setCartCount] = useState(0);
    const [compareList, setCompareList] = useState<Plan[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [cats, allPlans] = await Promise.all([
                    mockServicesApi.getCategories(),
                    mockServicesApi.getPlans({ categoryId: selectedCategory || undefined, query: searchQuery })
                ]);
                setCategories(cats);
                setPlans(allPlans);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchData, 300);
        return () => clearTimeout(debounce);
    }, [selectedCategory, searchQuery]);

    // Handlers
    const handleAddToCart = (config: PlanConfig, breakdown: PriceBreakdown) => {
        // In a real app, dispatch to cart context/store
        console.log("Added to cart:", config, breakdown);
        setCartCount(prev => prev + 1);

        const plan = plans.find(p => p.id === config.planId);
        if (plan) {
            showAddToCartToast(plan.title, () => navigate('/client/cart')); // Assuming cart route exists or will exist
        }
    };

    const toggleCompare = (plan: Plan) => {
        setCompareList(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) {
                return prev.filter(p => p.id !== plan.id);
            }
            if (prev.length >= 3) {
                // Could show toast here: "Max 3 plans for comparison"
                return prev;
            }
            return [...prev, plan];
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
                    <p className="text-muted-foreground mt-1">Explore our comprehensive range of services and solutions.</p>
                </div>
                <div className="flex items-center gap-3">
                    {compareList.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={() => setIsCompareOpen(true)}
                            className="gap-2"
                        >
                            Compare ({compareList.length})
                        </Button>
                    )}
                    <CartIconWithCount
                        count={cartCount}
                        onClick={() => navigate('/client/cart')} // Placeholder route
                    />
                </div>
            </div>

            {/* Filters */}
            <FiltersBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : plans.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    No services found matching your criteria.
                </div>
            ) : (
                <div className="space-y-12">
                    {categories
                        .filter(cat => !selectedCategory || cat.id === selectedCategory)
                        .map(category => {
                            const categoryPlans = plans.filter(p => p.categoryId === category.id);
                            if (categoryPlans.length === 0) return null;

                            return (
                                <ServiceCategory
                                    key={category.id}
                                    category={category}
                                    plans={categoryPlans}
                                    onSelectPlan={setConfigPlan}
                                    onViewDetails={setDetailPlan}
                                />
                            );
                        })}
                </div>
            )}

            {/* Modals */}
            {detailPlan && (
                <PlanDetailModal
                    plan={detailPlan}
                    open={!!detailPlan}
                    onClose={() => setDetailPlan(null)}
                    onConfigure={() => setConfigPlan(detailPlan)}
                    onCompare={(checked) => {
                        if (checked && !compareList.find(p => p.id === detailPlan.id)) {
                            toggleCompare(detailPlan);
                        } else if (!checked && compareList.find(p => p.id === detailPlan.id)) {
                            toggleCompare(detailPlan);
                        }
                    }}
                    isCompared={!!compareList.find(p => p.id === detailPlan.id)}
                />
            )}

            {configPlan && (
                <PlanConfigurator
                    plan={configPlan}
                    open={!!configPlan}
                    onClose={() => setConfigPlan(null)}
                    onAddToCart={handleAddToCart}
                />
            )}

            <ComparePlansModal
                plans={compareList}
                open={isCompareOpen}
                onClose={() => setIsCompareOpen(false)}
                onSelectPlan={(plan) => {
                    setConfigPlan(plan);
                    setIsCompareOpen(false);
                }}
                onRemovePlan={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
            />
        </div>
    );
}
