import servicesData from '../mock-data/services.json';

export interface Category {
    id: string;
    title: string;
    description: string;
}

export interface AddOn {
    id: string;
    title: string;
    price: number;
}

export interface PlanLimits {
    [key: string]: string | number;
}

export interface Plan {
    id: string;
    categoryId: string;
    title: string;
    description: string;
    priceMonthly: number;
    priceAnnual: number;
    perSeatPrice?: number;
    features: string[];
    addOns?: AddOn[];
    limits?: PlanLimits;
    popular?: boolean;
}

export interface Coupon {
    code: string;
    type: 'percent' | 'fixed';
    amount: number;
}

export interface PlanConfig {
    planId: string;
    billingInterval: 'monthly' | 'annual';
    seats?: number;
    selectedAddOns: string[]; // IDs of selected add-ons
    quantity?: number; // For one-off services if needed, default 1
}

export interface PriceBreakdown {
    basePrice: number;
    seatsCost: number;
    addOnsCost: number;
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
    currency: string;
}

const TAX_RATE = 0.1; // 10% mock tax

export const mockServicesApi = {
    getCategories: (): Promise<Category[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(servicesData.categories), 500);
        });
    },

    getPlans: (filters?: { categoryId?: string; query?: string; tags?: string[] }): Promise<Plan[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let plans = servicesData.plans as Plan[];

                if (filters?.categoryId) {
                    plans = plans.filter(p => p.categoryId === filters.categoryId);
                }

                if (filters?.query) {
                    const q = filters.query.toLowerCase();
                    plans = plans.filter(p =>
                        p.title.toLowerCase().includes(q) ||
                        p.description.toLowerCase().includes(q) ||
                        p.features.some(f => f.toLowerCase().includes(q))
                    );
                }

                // Tag filtering could be added here if plans had tags in JSON

                resolve(plans);
            }, 500);
        });
    },

    getPlanById: (id: string): Promise<Plan | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const plan = (servicesData.plans as Plan[]).find(p => p.id === id);
                resolve(plan);
            }, 300);
        });
    },

    applyCoupon: (code: string): Promise<Coupon | null> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const coupon = (servicesData.coupons as Coupon[]).find(c => c.code === code);
                resolve(coupon || null);
            }, 400);
        });
    },

    calculatePrice: async (config: PlanConfig, couponCode?: string): Promise<PriceBreakdown> => {
        const plan = (servicesData.plans as Plan[]).find(p => p.id === config.planId);
        if (!plan) {
            throw new Error("Plan not found");
        }

        const isAnnual = config.billingInterval === 'annual';
        const basePrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;

        let seatsCost = 0;
        if (plan.perSeatPrice && config.seats && config.seats > 0) {
            // Assuming perSeatPrice is monthly, multiply by 12 for annual if needed, 
            // OR assuming the JSON price is already adjusted. 
            // Let's assume perSeatPrice in JSON is monthly base.
            const seatPrice = isAnnual ? plan.perSeatPrice * 12 : plan.perSeatPrice;
            // Subtract 1 included seat if applicable, or just multiply by seats. 
            // Requirement says "Adjust seats (if applicable) with price-per-seat". 
            // Usually base price includes 1 seat or 0. Let's assume base price is for the platform/service, seats are extra.
            // Or if it's a per-seat plan (like SaaS), base price might be 0 or base fee.
            // Let's stick to: Base Price + (Seats * SeatPrice).
            seatsCost = config.seats * seatPrice;
        }

        let addOnsCost = 0;
        if (config.selectedAddOns && plan.addOns) {
            config.selectedAddOns.forEach(addOnId => {
                const addOn = plan.addOns?.find(a => a.id === addOnId);
                if (addOn) {
                    // Add-ons usually flat fee or recurring. Let's assume recurring matching interval for simplicity
                    // or one-time. The prompt implies "extra storage, consulting hours". 
                    // Let's treat them as recurring for subscription plans.
                    addOnsCost += addOn.price;
                }
            });
        }

        let subtotal = basePrice + seatsCost + addOnsCost;

        if (config.quantity && config.quantity > 1) {
            subtotal *= config.quantity;
        }

        let discountAmount = 0;
        if (couponCode) {
            const coupon = (servicesData.coupons as Coupon[]).find(c => c.code === couponCode);
            if (coupon) {
                if (coupon.type === 'percent') {
                    discountAmount = subtotal * (coupon.amount / 100);
                } else if (coupon.type === 'fixed') {
                    discountAmount = coupon.amount;
                }
            }
        }

        const taxableAmount = Math.max(0, subtotal - discountAmount);
        const taxAmount = taxableAmount * TAX_RATE;
        const total = taxableAmount + taxAmount;

        return {
            basePrice,
            seatsCost,
            addOnsCost,
            subtotal,
            discountAmount,
            taxAmount,
            total,
            currency: 'USD'
        };
    }
};
