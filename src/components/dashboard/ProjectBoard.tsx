import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, FileText, Upload } from "lucide-react";
import type { ProjectMilestone } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProjectBoardProps {
  orderId: string;
  orderName: string;
  milestones: ProjectMilestone[];
  loading?: boolean;
}

const statusConfig = {
  pending: { icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  in_progress: { icon: Clock, color: "text-primary", bg: "bg-primary/20" },
  complete: { icon: CheckCircle2, color: "text-success", bg: "bg-success/20" },
};

export function ProjectBoard({ orderId, orderName, milestones, loading }: ProjectBoardProps) {
  const completedCount = milestones.filter((m) => m.status === "complete").length;
  const progress = (completedCount / milestones.length) * 100;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 skeleton rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 skeleton rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{orderName}</h1>
          <p className="text-muted-foreground">{orderId}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="font-bold">{Math.round(progress)}%</p>
          </div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["pending", "in_progress", "complete"] as const).map((status) => {
          const config = statusConfig[status];
          const StatusIcon = config.icon;
          const statusMilestones = milestones.filter((m) => m.status === status);

          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <StatusIcon className={cn("w-5 h-5", config.color)} />
                <span className="font-medium capitalize">
                  {status.replace("_", " ")}
                </span>
                <Badge variant="secondary" className="ml-auto">
                  {statusMilestones.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {statusMilestones.map((milestone) => (
                  <Card
                    key={milestone.id}
                    variant="interactive"
                    className={cn("transition-all duration-200", config.bg)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{milestone.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Deliverables:</p>
                        <ul className="space-y-1">
                          {milestone.deliverables.map((d, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2
                                size={14}
                                className={status === "complete" ? "text-success" : "text-muted-foreground"}
                              />
                              <span className={cn(status === "complete" && "line-through text-muted-foreground")}>
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {statusMilestones.length === 0 && (
                  <div className="p-4 rounded-lg border border-dashed border-border text-center text-sm text-muted-foreground">
                    No milestones
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Log */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Design mockups uploaded", time: "2 hours ago", icon: Upload },
              { action: "Requirements document approved", time: "1 day ago", icon: FileText },
              { action: "Project kickoff completed", time: "3 days ago", icon: CheckCircle2 },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <activity.icon size={14} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
