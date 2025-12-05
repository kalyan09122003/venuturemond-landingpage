import { USD_TO_INR_RATE } from '@/config/currency';

export interface DualCurrencyPrice {
    usd: string;
    inr: string;
    combined: string;
}

export function formatDualCurrency(amountUSD: number): DualCurrencyPrice {
    const amountINR = amountUSD * USD_TO_INR_RATE;

    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    const inrFormatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    const usd = usdFormatter.format(amountUSD);
    const inr = inrFormatter.format(amountINR);

    return {
        usd,
        inr,
        combined: `${usd} USD • ${inr} INR`,
    };
}
