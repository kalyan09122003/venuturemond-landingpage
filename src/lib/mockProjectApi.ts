import projectsData from '../mock-data/projects.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory state
let projects = [...projectsData];

export const mockProjectApi = {
    getProjects: async () => {
        await delay(400);
        return projects;
    },

    getProject: async (projectId: string) => {
        await delay(300);
        return projects.find(p => p.id === projectId) || null;
    },

    createProject: async (projectData: any) => {
        await delay(600);
        const newProject = {
            id: `proj-${Date.now()}`,
            progress: 0,
            tasks: [],
            files: [],
            deliverables: [],
            meetings: [],
            activity: [],
            createdAt: new Date().toISOString(),
            ...projectData,
            // Ensure defaults if not provided
            status: projectData.status || 'Planning',
            team: projectData.team || [],
        };
        projects.unshift(newProject);
        return newProject;
    },

    // Tasks
    getTasks: async (projectId: string) => {
        await delay(300);
        const project = projects.find(p => p.id === projectId);
        return project ? project.tasks : [];
    },

    createTask: async (projectId: string, task: any) => {
        await delay(400);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const newTask = { id: `t-${Date.now()}`, ...task, comments: [] };
            projects[projectIndex].tasks.push(newTask);
            return newTask;
        }
        return null;
    },

    updateTask: async (projectId: string, taskId: string, updates: any) => {
        await delay(300);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const taskIndex = projects[projectIndex].tasks.findIndex((t: any) => t.id === taskId);
            if (taskIndex > -1) {
                projects[projectIndex].tasks[taskIndex] = { ...projects[projectIndex].tasks[taskIndex], ...updates };
                return projects[projectIndex].tasks[taskIndex];
            }
        }
        return null;
    },

    moveTask: async (projectId: string, taskId: string, newStatus: string) => {
        return mockProjectApi.updateTask(projectId, taskId, { status: newStatus });
    },

    // Files
    getFiles: async (projectId: string) => {
        await delay(300);
        const project = projects.find(p => p.id === projectId);
        return project ? project.files : [];
    },

    uploadFile: async (projectId: string, file: any) => {
        await delay(800);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const newFile = { id: `f-${Date.now()}`, ...file, uploadedAt: new Date().toISOString() };
            projects[projectIndex].files.push(newFile);
            return newFile;
        }
        return null;
    },

    // Deliverables
    getDeliverables: async (projectId: string) => {
        await delay(300);
        const project = projects.find(p => p.id === projectId);
        return project ? project.deliverables : [];
    },

    createDeliverable: async (projectId: string, deliverable: any) => {
        await delay(500);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const newDeliverable = { id: `d-${Date.now()}`, ...deliverable, status: 'Draft' };
            projects[projectIndex].deliverables.push(newDeliverable);
            return newDeliverable;
        }
        return null;
    },

    approveDeliverable: async (projectId: string, deliverableId: string, actor: string) => {
        await delay(400);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const dIndex = projects[projectIndex].deliverables.findIndex((d: any) => d.id === deliverableId);
            if (dIndex > -1) {
                projects[projectIndex].deliverables[dIndex] = {
                    ...projects[projectIndex].deliverables[dIndex],
                    status: 'Approved',
                    approvedAt: new Date().toISOString(),
                    approvedBy: actor
                };
                return projects[projectIndex].deliverables[dIndex];
            }
        }
        return null;
    },

    // Meetings
    getMeetings: async (projectId: string) => {
        await delay(300);
        const project = projects.find(p => p.id === projectId);
        return project ? project.meetings : [];
    },

    scheduleMeeting: async (projectId: string, meeting: any) => {
        await delay(500);
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            const newMeeting = { id: `m-${Date.now()}`, ...meeting };
            projects[projectIndex].meetings.push(newMeeting);
            return newMeeting;
        }
        return null;
    },

    // Budget
    getBudget: async (projectId: string) => {
        await delay(300);
        const project = projects.find(p => p.id === projectId);
        return project ? project.budget : null;
    },

    logTime: async (projectId: string, taskId: string, timeEntry: any) => {
        await delay(400);
        // In a real app, this would add to a timeLogs array.
        // For now, we'll just increment spent budget as a simulation
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex > -1) {
            // Assume $100/hr rate
            const cost = timeEntry.hours * 100;
            projects[projectIndex].budget.spent += cost;
            return projects[projectIndex].budget;
        }
        return null;
    }
};
