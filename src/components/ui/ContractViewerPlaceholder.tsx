import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, PenTool } from "lucide-react";

interface ContractViewerPlaceholderProps {
    onSign: () => void;
    isSigning: boolean;
}

export function ContractViewerPlaceholder({ onSign, isSigning }: ContractViewerPlaceholderProps) {
    const [hasReadToBottom, setHasReadToBottom] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            setHasReadToBottom(true);
        }
    };

    return (
        <div className="space-y-6">
            <div className="border rounded-md p-4 bg-muted/50">
                <ScrollArea className="h-[400px] w-full rounded-md border bg-background p-8" onScrollCapture={handleScroll}>
                    <div className="prose prose-sm max-w-none">
                        <h2 className="text-center font-bold text-xl mb-8">MASTER SERVICES AGREEMENT</h2>
                        <p className="font-bold">1. PARTIES</p>
                        <p>This Agreement is entered into between VentureMond ("Provider") and the Client ("Customer").</p>

                        <p className="font-bold mt-4">2. SERVICES</p>
                        <p>Provider agrees to deliver the services as described in the Order Form. Services will be performed in a professional manner consistent with industry standards.</p>

                        <p className="font-bold mt-4">3. PAYMENT TERMS</p>
                        <p>Client agrees to pay the fees set forth in the Order Form. Payment is due upon receipt of invoice unless otherwise specified.</p>

                        <p className="font-bold mt-4">4. INTELLECTUAL PROPERTY</p>
                        <p>All intellectual property rights in the deliverables shall belong to the Client upon full payment. Provider retains rights to pre-existing materials.</p>

                        <p className="font-bold mt-4">5. CONFIDENTIALITY</p>
                        <p>Both parties agree to maintain the confidentiality of proprietary information disclosed during the term of this Agreement.</p>

                        <p className="font-bold mt-4">6. TERM AND TERMINATION</p>
                        <p>This Agreement commences on the Effective Date and continues until terminated. Either party may terminate for material breach with 30 days notice.</p>

                        <p className="font-bold mt-4">7. LIMITATION OF LIABILITY</p>
                        <p>Provider's liability shall be limited to the amount paid by Client in the 12 months preceding the claim.</p>

                        <div className="h-32"></div> {/* Spacer to force scroll */}
                        <p className="text-center text-muted-foreground italic">End of Agreement</p>
                    </div>
                </ScrollArea>
            </div>

            <div className="flex flex-col items-center gap-4">
                {!hasReadToBottom && (
                    <p className="text-sm text-muted-foreground">Please scroll to the bottom of the contract to sign.</p>
                )}
                <Button
                    size="lg"
                    onClick={onSign}
                    disabled={!hasReadToBottom || isSigning}
                    className="min-w-[200px]"
                >
                    {isSigning ? (
                        <>Signing...</>
                    ) : (
                        <>
                            <PenTool className="mr-2 h-4 w-4" />
                            Sign & Accept
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
