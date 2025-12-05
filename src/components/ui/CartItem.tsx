import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RemoveItemModal } from "./RemoveItemModal";

interface CartItemProps {
    item: any;
    onUpdate: (id: string, updates: any) => void;
    onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdate, onRemove }: CartItemProps) {
    const [showRemoveModal, setShowRemoveModal] = useState(false);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, item.quantity + delta);
        onUpdate(item.id, { quantity: newQuantity });
    };

    const handleSeatsChange = (delta: number) => {
        const newSeats = Math.max(1, item.seats + delta);
        onUpdate(item.id, { seats: newSeats });
    };

    const toggleAddOn = (addonId: string, currentEnabled: boolean) => {
        const newAddOns = item.add_ons.map((addon: any) =>
            addon.id === addonId ? { ...addon, enabled: !currentEnabled } : addon
        );
        onUpdate(item.id, { add_ons: newAddOns });
    };

    const calculateItemTotal = () => {
        const addonsTotal = item.add_ons?.reduce((sum: number, addon: any) => {
            return sum + (addon.enabled ? addon.price : 0);
        }, 0) || 0;
        return (item.price_per_unit * item.seats + addonsTotal) * item.quantity;
    };

    return (
        <>
            <Card className="mb-4">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Item Info */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground text-sm">{item.subtitle}</p>

                            <div className="mt-4 space-y-3">
                                {item.add_ons && item.add_ons.map((addon: any) => (
                                    <div key={addon.id} className="flex items-center gap-2 text-sm">
                                        <Checkbox
                                            id={`addon-${addon.id}`}
                                            checked={addon.enabled}
                                            onCheckedChange={() => toggleAddOn(addon.id, addon.enabled)}
                                        />
                                        <label htmlFor={`addon-${addon.id}`} className="cursor-pointer select-none">
                                            {addon.title} (+${addon.price})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-4 min-w-[200px]">
                            {/* Quantity */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Quantity</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Seats */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Seats</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleSeatsChange(-1)}>
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">{item.seats}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleSeatsChange(1)}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="font-bold text-lg">
                                    ${calculateItemTotal().toLocaleString()}
                                </span>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" onClick={() => setShowRemoveModal(true)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <RemoveItemModal
                open={showRemoveModal}
                onOpenChange={setShowRemoveModal}
                onConfirm={() => {
                    onRemove(item.id);
                    setShowRemoveModal(false);
                }}
            />
        </>
    );
}
