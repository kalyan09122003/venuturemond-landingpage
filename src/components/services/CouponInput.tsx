import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Check, X } from 'lucide-react';
import { mockServicesApi } from '@/lib/mockServicesApi';
import { cn } from '@/lib/utils';

interface CouponInputProps {
    onApply: (code: string) => void;
    className?: string;
}

export function CouponInput({ onApply, className }: CouponInputProps) {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleApply = async () => {
        if (!code.trim()) return;

        setStatus('loading');
        setMessage('');

        try {
            const coupon = await mockServicesApi.applyCoupon(code.toUpperCase());
            if (coupon) {
                setStatus('success');
                setMessage(`Applied: ${coupon.amount}${coupon.type === 'percent' ? '%' : '$'} off`);
                onApply(coupon.code);
            } else {
                setStatus('error');
                setMessage('Invalid coupon code');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Error applying coupon');
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex gap-2">
                <Input
                    placeholder="Coupon code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        if (status !== 'idle') {
                            setStatus('idle');
                            setMessage('');
                        }
                    }}
                    disabled={status === 'loading' || status === 'success'}
                    className={cn(
                        status === 'success' && "border-green-500 focus-visible:ring-green-500",
                        status === 'error' && "border-red-500 focus-visible:ring-red-500"
                    )}
                />
                <Button
                    onClick={handleApply}
                    disabled={!code || status === 'loading' || status === 'success'}
                    variant="outline"
                >
                    {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                </Button>
            </div>
            {message && (
                <p className={cn(
                    "text-xs flex items-center gap-1",
                    status === 'success' ? "text-green-600" : "text-red-500"
                )}>
                    {status === 'success' ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    {message}
                </p>
            )}
        </div>
    );
}
