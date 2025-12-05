import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function StatusBanner() {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Instance: Online • 99.9% uptime</span>
        </div>
    );
}
