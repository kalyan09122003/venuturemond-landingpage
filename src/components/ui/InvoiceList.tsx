import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, FileText } from "lucide-react";
import { PriceBadge } from "../services/PriceBadge";

interface Invoice {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    date: string;
    dueDate: string;
    pdfUrl: string;
}

interface InvoiceListProps {
    invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Order Ref</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                No invoices found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    {invoice.id}
                                </TableCell>
                                <TableCell>{invoice.orderId}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.dueDate}</TableCell>
                                <TableCell>
                                    <Badge variant={invoice.status === 'paid' ? 'default' : 'destructive'}>
                                        {invoice.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <PriceBadge amount={invoice.amount} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
