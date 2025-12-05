import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, Folder, MoreVertical, Download, Clock, UploadCloud, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface FileBrowserProps {
    files: any[];
    onUpload: (file: any) => void;
}

export function FileBrowser({ files, onUpload }: FileBrowserProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Simulate file upload
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            const file = droppedFiles[0];
            onUpload({
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                type: file.type.split('/')[1] || 'unknown',
                uploadedBy: 'You',
                version: 1
            });
        }
    };

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-secondary rounded-full">
                        <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">Upload Files</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                    <Button variant="outline" className="mt-2" onClick={() => {
                        // Simulate click
                        onUpload({
                            name: `New_Design_v${files.length + 1}.fig`,
                            size: '12.5 MB',
                            type: 'design',
                            uploadedBy: 'You',
                            version: 1
                        });
                    }}>
                        Browse Files
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {files.map((file) => (
                    <Card key={file.id} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-md">
                                        <FileIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium leading-none line-clamp-1" title={file.name}>
                                            {file.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{file.size}</span>
                                            <span>•</span>
                                            <span>v{file.version}</span>
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Download className="h-4 w-4 mr-2" /> Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Clock className="h-4 w-4 mr-2" /> History
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                <span>Uploaded by {file.uploadedBy}</span>
                                <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
