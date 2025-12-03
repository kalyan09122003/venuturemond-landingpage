import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Wallet, CheckCircle2 } from "lucide-react";

interface CartItem {
    serviceName: string;
    planName: string;
    total: number;
    config: any;
}

interface CartCheckoutProps {
    cart: CartItem[];
    onCheckout: () => void;
}

export function CartCheckout({ cart, onCheckout }: CartCheckoutProps) {
    const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const handlePayment = () => {
        // Simulate processing
        setTimeout(() => {
            setStep('success');
            onCheckout();
        }, 1500);
    };

    if (step === 'success') {
        return (
            <Card className="w-full max-w-md mx-auto text-center py-10 animate-in fade-in zoom-in-95">
                <CardContent className="space-y-4">
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                    <p className="text-muted-foreground">Thank you for your purchase. Your order is being processed.</p>
                    <Button className="mt-4" onClick={() => window.location.href = '/client/orders'}>
                        View Orders
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Checkout</CardTitle>
                        <CardDescription>Complete your purchase</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {step === 'review' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold">Review Items</h3>
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start border p-4 rounded-md">
                                        <div>
                                            <p className="font-medium">{item.serviceName} - {item.planName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.config.seats} seats, {item.config.storage}GB Storage
                                            </p>
                                        </div>
                                        <p className="font-bold">${item.total.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {step === 'payment' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold">Payment Method</h3>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                        <Label
                                            htmlFor="card"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <CreditCard className="mb-3 h-6 w-6" />
                                            Card
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                        <Label
                                            htmlFor="paypal"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Wallet className="mb-3 h-6 w-6" />
                                            PayPal
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === 'card' && (
                                    <div className="grid gap-4 mt-4">
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
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step === 'payment' && (
                            <Button variant="outline" onClick={() => setStep('review')}>Back</Button>
                        )}
                        <div className="ml-auto">
                            {step === 'review' ? (
                                <Button onClick={() => setStep('payment')}>Proceed to Payment</Button>
                            ) : (
                                <Button onClick={handlePayment}>Pay ${total.toFixed(2)}</Button>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </div>

            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
