import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { mockApi } from '@/lib/mockApi';
import { toast } from "sonner";

interface ExportDropdownProps {
    data: any[];
}

export function ExportDropdown({ data }: ExportDropdownProps) {
    const [loading, setLoading] = useState(false);

    const handleExport = async (type: 'csv' | 'pdf' | 'xlsx', label: string) => {
        setLoading(true);
        try {
            await mockApi.downloadMockCsv(data, `revenue_data.${type}`);
            toast.success(`${label} exported successfully`);
        } catch (error) {
            toast.error("Export failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-2" disabled={loading}>
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExport('csv', 'Revenue CSV')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Export Revenue (CSV)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf', 'Revenue PDF')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Export Revenue (PDF)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('csv', 'Billing CSV')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Export Billing (CSV)</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
