import React, { useEffect, useState } from 'react';
import { RoadmapMilestones } from '@/components/projects/RoadmapMilestones';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';

export default function ProjectRoadmap() {
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

    if (loading) return <div>Loading roadmap...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <RoadmapMilestones project={project} />
    );
}
