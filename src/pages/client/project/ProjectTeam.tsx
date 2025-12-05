import React, { useEffect, useState } from 'react';
import { TeamAssignmentPanel } from '@/components/projects/TeamAssignmentPanel';
import { ProjectActivityLog } from '@/components/projects/ProjectActivityLog';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';

export default function ProjectTeam() {
    const { projectId } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            loadProject();
        }
    }, [projectId]);

    const loadProject = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getProject(projectId);
        setProject(data);
        setLoading(false);
    };

    if (loading) return <div>Loading team...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <TeamAssignmentPanel team={project.team} />
            </div>
            <div>
                <ProjectActivityLog activity={project.activity} />
            </div>
        </div>
    );
}
