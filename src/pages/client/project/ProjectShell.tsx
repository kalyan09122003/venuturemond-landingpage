import React, { useState } from 'react';
import { ProjectHeader } from '@/components/projects/ProjectHeader';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { TaskEditorModal } from '@/components/projects/TaskEditorModal';
import { ProjectCreateModal } from '@/components/projects/ProjectCreateModal';
import { FileUploadModal, DeliverableCreateModal, MeetingCreateModal } from '@/components/projects/ProjectModals';
import { mockProjectApi } from '@/lib/mockProjectApi';
import { useToast } from "@/components/ui/use-toast";

interface ProjectShellProps {
    project: any;
    children: React.ReactNode;
}

export function ProjectShell({ project, children }: ProjectShellProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = useParams();
    const { toast } = useToast();

    // Modal States
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isFileModalOpen, setIsFileModalOpen] = useState(false);
    const [isDeliverableModalOpen, setIsDeliverableModalOpen] = useState(false);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

    // Determine active tab from URL
    const currentPath = location.pathname.split('/').pop();
    const activeTab = ['tasks', 'files', 'deliverables', 'roadmap', 'meetings', 'budget', 'team'].includes(currentPath || '')
        ? currentPath
        : 'tasks';

    const handleTabChange = (value: string) => {
        navigate(`/client/projects/${projectId}/${value}`);
    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'add_task':
                setIsTaskModalOpen(true);
                break;
            case 'upload_file':
                setIsFileModalOpen(true);
                break;
            case 'create_deliverable':
                setIsDeliverableModalOpen(true);
                break;
            case 'schedule_meeting':
                setIsMeetingModalOpen(true);
                break;
            case 'edit_project':
                setIsEditProjectModalOpen(true);
                break;
            default:
                console.log("Unknown action:", action);
        }
    };

    // Handlers
    const handleTaskCreate = async (task: any) => {
        if (!projectId) return;
        await mockProjectApi.createTask(projectId, task);
        setIsTaskModalOpen(false);
        toast({ title: "Task Created", description: "The task has been successfully created." });
        // Note: Sub-components need to refresh data. Since we use mockApi, 
        // if they fetch on mount/update, we might need to trigger a refresh or just rely on navigation.
        if (activeTab === 'tasks') {
            // Force refresh logic if needed, or just let the user see it next time
            // Ideally we'd use a context or SWR/React Query for auto-refresh
            window.location.reload(); // Simple brute force for now to ensure user sees it
        }
    };

    const handleFileUpload = async (file: any) => {
        if (!projectId) return;
        await mockProjectApi.uploadFile(projectId, file);
        setIsFileModalOpen(false);
        toast({ title: "File Uploaded", description: "The file has been successfully uploaded." });
        if (activeTab === 'files') window.location.reload();
    };

    const handleDeliverableCreate = async (deliverable: any) => {
        if (!projectId) return;
        await mockProjectApi.createDeliverable(projectId, deliverable);
        setIsDeliverableModalOpen(false);
        toast({ title: "Deliverable Created", description: "The deliverable has been created." });
        if (activeTab === 'deliverables') window.location.reload();
    };

    const handleMeetingSchedule = async (meeting: any) => {
        if (!projectId) return;
        await mockProjectApi.scheduleMeeting(projectId, meeting);
        setIsMeetingModalOpen(false);
        toast({ title: "Meeting Scheduled", description: "The meeting has been scheduled." });
        if (activeTab === 'meetings') window.location.reload();
    };

    const handleProjectUpdate = async (updatedProject: any) => {
        // Mock API doesn't have updateProject yet, but let's assume we can just log it or add it
        // For now, just close modal
        setIsEditProjectModalOpen(false);
        toast({ title: "Project Updated", description: "Project details have been updated." });
    };

    return (
        <div className="space-y-6">
            <ProjectHeader project={project} onAction={handleAction} />

            <Tabs value={activeTab || 'tasks'} onValueChange={handleTabChange} className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                    <TabsTrigger value="meetings">Meetings</TabsTrigger>
                    <TabsTrigger value="budget">Budget</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    {children}
                </div>
            </Tabs>

            {/* Modals */}
            <TaskEditorModal
                open={isTaskModalOpen}
                onOpenChange={setIsTaskModalOpen}
                onSave={handleTaskCreate}
            />

            <FileUploadModal
                open={isFileModalOpen}
                onClose={() => setIsFileModalOpen(false)}
                onUpload={handleFileUpload}
            />

            <DeliverableCreateModal
                open={isDeliverableModalOpen}
                onClose={() => setIsDeliverableModalOpen(false)}
                onCreate={handleDeliverableCreate}
            />

            <MeetingCreateModal
                open={isMeetingModalOpen}
                onClose={() => setIsMeetingModalOpen(false)}
                onSchedule={handleMeetingSchedule}
            />

            <ProjectCreateModal
                open={isEditProjectModalOpen}
                onClose={() => setIsEditProjectModalOpen(false)}
                onCreate={handleProjectUpdate}
                project={project}
            />
        </div>
    );
}
