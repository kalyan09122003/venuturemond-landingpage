import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, FileText, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentMethodSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
    return (
        <div className="space-y-4">
            <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                    >
                        <CreditCard className="mb-3 h-6 w-6" />
                        <span className="font-semibold">Card</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                        htmlFor="upi"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                    >
                        <Smartphone className="mb-3 h-6 w-6" />
                        <span className="font-semibold">UPI</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="invoice" id="invoice" className="peer sr-only" />
                    <Label
                        htmlFor="invoice"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                    >
                        <FileText className="mb-3 h-6 w-6" />
                        <span className="font-semibold">Invoice / PO</span>
                    </Label>
                </div>
            </RadioGroup>

            {value === 'card' && (
                <div className="grid gap-4 mt-6 p-4 border rounded-md animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name on Card</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="number">Card Number</Label>
                        <Input id="number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </div>
            )}

            {value === 'upi' && (
                <div className="mt-6 p-4 border rounded-md animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="username@upi" />
                    </div>
                </div>
            )}

            {value === 'invoice' && (
                <div className="mt-6 p-4 border rounded-md animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-2">
                        <Label htmlFor="po-number">Purchase Order Number (Optional)</Label>
                        <Input id="po-number" placeholder="PO-12345" />
                        <p className="text-xs text-muted-foreground">Upload PO document if available.</p>
                        <Input type="file" className="cursor-pointer" />
                    </div>
                </div>
            )}
        </div>
    );
}
