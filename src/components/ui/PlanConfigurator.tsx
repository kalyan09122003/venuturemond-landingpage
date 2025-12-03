import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface AddOn {
    id: string;
    name: string;
    price: number;
}

interface PlanConfiguratorProps {
    serviceName: string;
    planName: string;
    basePrice: number;
    addOns: AddOn[];
    onAddToCart: (config: any) => void;
    onCancel: () => void;
}

export function PlanConfigurator({ serviceName, planName, basePrice, addOns, onAddToCart, onCancel }: PlanConfiguratorProps) {
    const [seats, setSeats] = useState(1);
    const [storage, setStorage] = useState(10); // GB
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        let total = basePrice;
        // Mock logic: extra seats cost $10, extra storage costs $1/GB over 10GB
        total += (seats - 1) * 10;
        total += (storage - 10) * 1;

        selectedAddOns.forEach(id => {
            const addon = addOns.find(a => a.id === id);
            if (addon) total += addon.price;
        });

        return total;
    };

    return (
        <Card className="w-full max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
            <CardHeader>
                <CardTitle>Configure Your Plan</CardTitle>
                <CardDescription>{serviceName} - {planName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Seats</Label>
                            <span className="text-sm text-muted-foreground">{seats} users</span>
                        </div>
                        <Slider
                            value={[seats]}
                            min={1}
                            max={50}
                            step={1}
                            onValueChange={(vals) => setSeats(vals[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label>Storage</Label>
                            <span className="text-sm text-muted-foreground">{storage} GB</span>
                        </div>
                        <Slider
                            value={[storage]}
                            min={10}
                            max={1000}
                            step={10}
                            onValueChange={(vals) => setStorage(vals[0])}
                        />
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label>Add-ons</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {addOns.map((addon) => (
                            <div key={addon.id} className="flex items-center space-x-2 border p-3 rounded-md">
                                <Checkbox
                                    id={addon.id}
                                    checked={selectedAddOns.includes(addon.id)}
                                    onCheckedChange={() => toggleAddOn(addon.id)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor={addon.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {addon.name}
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        +${addon.price}/mo
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total Monthly</span>
                    <span className="font-bold text-2xl text-primary">${calculateTotal().toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onAddToCart({ seats, storage, selectedAddOns, total: calculateTotal() })}>
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
