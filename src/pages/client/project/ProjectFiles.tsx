import React, { useEffect, useState } from 'react';
import { FileBrowser } from '@/components/projects/FileBrowser';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useParams } from 'react-router-dom';

export default function ProjectFiles() {
    const { projectId } = useParams();
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            loadFiles();
        }
    }, [projectId]);

    const loadFiles = async () => {
        if (!projectId) return;
        setLoading(true);
        const data = await mockProjectApi.getFiles(projectId);
        setFiles(data);
        setLoading(false);
    };

    const handleUpload = async (file: any) => {
        if (!projectId) return;
        const uploaded = await mockProjectApi.uploadFile(projectId, file);
        if (uploaded) {
            setFiles(prev => [...prev, uploaded]);
        }
    };

    if (loading) return <div>Loading files...</div>;

    return (
        <FileBrowser files={files} onUpload={handleUpload} />
    );
}
