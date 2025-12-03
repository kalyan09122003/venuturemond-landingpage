import React, { useEffect, useState } from 'react';
import { InvoiceList } from "@/components/ui/InvoiceList";
import { mockApi } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";

export default function Invoices() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const data = await mockApi.getInvoices();
                setInvoices(data);
            } catch (error) {
                console.error("Failed to fetch invoices", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                <p className="text-muted-foreground">View and download your invoices.</p>
            </div>
            <InvoiceList invoices={invoices} />
        </div>
    );
}
