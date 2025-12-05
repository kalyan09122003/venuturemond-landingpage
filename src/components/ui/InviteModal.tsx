import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Plus, X } from "lucide-react";

interface InviteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
    const [loading, setLoading] = React.useState(false);
    const [emails, setEmails] = React.useState<string[]>(['']);

    const handleAddEmail = () => {
        setEmails([...emails, '']);
    };

    const handleRemoveEmail = (index: number) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Team Members</DialogTitle>
                    <DialogDescription>
                        Invite your team to collaborate on VentureMond.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        {emails.map((email, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor={`email-${index}`} className="sr-only">Email</Label>
                                    <Input
                                        type="email"
                                        id={`email-${index}`}
                                        placeholder="colleague@company.com"
                                        value={email}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                                {emails.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveEmail(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button type="button" variant="outline" size="sm" className="w-full border-dashed" onClick={handleAddEmail}>
                        <Plus className="mr-2 h-4 w-4" /> Add another
                    </Button>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Invites
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
