import React, { useEffect, useState } from 'react';
import { DeliverableCard } from '@/components/projects/DeliverableCard';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectDeliverables() {
    const { projectId } = useParams();
    const [deliverables, setDeliverables] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            loadDeliverables();
        }
    }, [projectId]);

    const loadDeliverables = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getDeliverables(projectId);
        setDeliverables(data);
        setLoading(false);
    };

    const handleApprove = async (id: string) => {
        if (!projectId) return;
        const updated = await mockProjectApi.approveDeliverable(projectId, id, 'You');
        if (updated) {
            setDeliverables(prev => prev.map(d => d.id === id ? updated : d));
        }
    };

    const handleReject = async (id: string) => {
        // Implement reject logic in mockApi if needed, for now just log
        console.log("Rejecting deliverable", id);
    };

    const handleCreate = async () => {
        if (!projectId) return;
        const newDeliverable = {
            title: "New Deliverable",
            dueDate: new Date().toISOString().split('T')[0],
        };
        const created = await mockProjectApi.createDeliverable(projectId, newDeliverable);
        if (created) {
            setDeliverables(prev => [...prev, created]);
        }
    };

    if (loading) return <div>Loading deliverables...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={handleCreate} size="sm">
                    <Plus className="h-4 w-4 mr-2" /> New Deliverable
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {deliverables.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                        No deliverables yet.
                    </div>
                ) : (
                    deliverables.map((d) => (
                        <DeliverableCard
                            key={d.id}
                            deliverable={d}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
