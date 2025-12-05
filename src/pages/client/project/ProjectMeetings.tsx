import React, { useEffect, useState } from 'react';
import { MeetingScheduler } from '@/components/projects/MeetingScheduler';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';

export default function ProjectMeetings() {
    const { projectId } = useParams();
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            loadMeetings();
        }
    }, [projectId]);

    const loadMeetings = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getMeetings(projectId);
        setMeetings(data);
        setLoading(false);
    };

    const handleSchedule = async (meeting: any) => {
        if (!projectId) return;
        const scheduled = await mockProjectApi.scheduleMeeting(projectId, meeting);
        if (scheduled) {
            setMeetings(prev => [...prev, scheduled]);
        }
    };

    if (loading) return <div>Loading meetings...</div>;

    return (
        <MeetingScheduler meetings={meetings} onSchedule={handleSchedule} />
    );
}
