import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "@/lib/mockApi";
import { PaymentMethodSelector } from "@/components/ui/PaymentMethodSelector";
import { TaxBreakdown } from "@/components/ui/TaxBreakdown";

export default function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [agreedToContract, setAgreedToContract] = useState(false);

    // Billing Form State
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        setLoading(true);
        const data = await mockApi.getCart();
        if (!data || !data.items || data.items.length === 0) {
            navigate('/client/cart');
            return;
        }
        setCart(data);
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckout = async () => {
        if (!agreedToContract) return;
        setProcessing(true);

        // Calculate final amount
        const subtotal = cart.items.reduce((acc: number, item: any) => {
            const itemTotal = (item.price_per_unit * item.quantity) + (item.add_ons?.reduce((sum: number, addon: any) => sum + addon.price, 0) || 0);
            return acc + itemTotal;
        }, 0);
        const discountAmount = cart.coupon ? (subtotal * (cart.coupon.discount_percent / 100)) : 0;
        const taxableAmount = subtotal - discountAmount;
        const taxAmount = taxableAmount * (cart.tax_percent / 100);
        const total = taxableAmount + taxAmount;

        const orderData = {
            service: cart.items.map((i: any) => i.title).join(', '),
            amount: total,
            items: cart.items.map((i: any) => ({
                name: i.title,
                price: i.price_per_unit,
                quantity: i.quantity
            })),
            billingDetails,
            paymentMethod
        };

        const newOrder = await mockApi.createOrder(orderData);
        setProcessing(false);
        navigate(`/client/contract?orderId=${newOrder.id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Calculate totals for display
    const subtotal = cart.items.reduce((acc: number, item: any) => {
        const itemTotal = (item.price_per_unit * item.quantity) + (item.add_ons?.reduce((sum: number, addon: any) => sum + addon.price, 0) || 0);
        return acc + itemTotal;
    }, 0);
    const discountAmount = cart.coupon ? (subtotal * (cart.coupon.discount_percent / 100)) : 0;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (cart.tax_percent / 100);
    const total = taxableAmount + taxAmount;

    return (
        <div className="container mx-auto py-6 space-y-6 animate-in fade-in duration-500">
            <Button variant="ghost" onClick={() => navigate('/client/cart')} className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" /> Back to Cart
            </Button>

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-muted-foreground">Complete your purchase securely.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Billing Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" value={billingDetails.firstName} onChange={handleInputChange} placeholder="John" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" value={billingDetails.lastName} onChange={handleInputChange} placeholder="Doe" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input id="company" value={billingDetails.company} onChange={handleInputChange} placeholder="Acme Inc." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={billingDetails.email} onChange={handleInputChange} placeholder="john@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" value={billingDetails.address} onChange={handleInputChange} placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" value={billingDetails.city} onChange={handleInputChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="zip">ZIP / Postal</Label>
                                    <Input id="zip" value={billingDetails.zip} onChange={handleInputChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" value={billingDetails.country} onChange={handleInputChange} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {cart.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                        <span>{item.title} x{item.quantity}</span>
                                        <span>${(item.price_per_unit * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <TaxBreakdown subtotal={taxableAmount} taxPercent={cart.tax_percent} />
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contract Agreement */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={agreedToContract}
                                    onCheckedChange={(checked) => setAgreedToContract(checked as boolean)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the terms and conditions and the Master Services Agreement.
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        You will be asked to sign the contract in the next step.
                                    </p>
                                </div>
                            </div>
                            <Button
                                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={!agreedToContract || processing}
                            >
                                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm & Pay'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Helper component for separator since it's used
function Separator({ className }: { className?: string }) {
    return <div className={`h-[1px] w-full bg-border ${className}`} />;
}
