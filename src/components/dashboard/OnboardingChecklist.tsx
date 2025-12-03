import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OnboardingStep } from "@/lib/mock-data";

interface OnboardingChecklistProps {
  progress: number;
  steps: OnboardingStep[];
  loading?: boolean;
  onAction?: (stepId: string) => void;
}

export function OnboardingChecklist({ progress, steps, loading, onAction }: OnboardingChecklistProps) {
  const getStatusIcon = (status: OnboardingStep["status"]) => {
    switch (status) {
      case "complete":
        return <Check className="text-success" size={18} />;
      case "in_progress":
        return <Loader2 className="text-primary animate-spin" size={18} />;
      default:
        return <Circle className="text-muted-foreground" size={18} />;
    }
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <div className="h-6 w-40 skeleton rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-2 w-full skeleton rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-5 h-5 skeleton rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 skeleton rounded" />
                <div className="h-3 w-48 skeleton rounded" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Onboarding Progress</CardTitle>
          <span className="text-sm text-muted-foreground">{progress}% complete</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-colors",
                step.status === "in_progress" && "bg-primary/5 border border-primary/20"
              )}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <div>
                  <p className={cn(
                    "text-sm font-medium",
                    step.status === "complete" && "text-muted-foreground line-through"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {step.action && step.status !== "complete" && (
                <Button
                  size="sm"
                  variant={step.status === "in_progress" ? "default" : "outline"}
                  onClick={() => onAction?.(step.id)}
                >
                  {step.action}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
