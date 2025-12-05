import React, { useEffect, useState } from 'react';
import { BudgetSummary } from '@/components/projects/BudgetSummary';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';

export default function ProjectBudget() {
    const { projectId } = useParams();
    const [budget, setBudget] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            loadBudget();
        }
    }, [projectId]);

    const loadBudget = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getBudget(projectId);
        setBudget(data);
        setLoading(false);
    };

    if (loading) return <div>Loading budget...</div>;

    return (
        <BudgetSummary budget={budget} />
    );
}
