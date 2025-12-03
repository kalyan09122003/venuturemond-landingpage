import React from 'react';
import { SettingsPanel } from "@/components/ui/SettingsPanel";

export default function Settings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <SettingsPanel />
        </div>
    );
}
