import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserPlus, MoreVertical, Trash2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TeamMember } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

interface TeamManagementProps {
  members: TeamMember[];
  maxSeats?: number;
  loading?: boolean;
}

export function TeamManagement({ members, maxSeats = 10, loading }: TeamManagementProps) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
  const [inviting, setInviting] = useState(false);

  const usedSeats = members.length;

  const handleInvite = async () => {
    if (!inviteEmail) return;
    
    setInviting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setInviting(false);
    setInviteModalOpen(false);
    setInviteEmail("");
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${inviteEmail}`,
    });
  };

  const handleRevoke = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRevokeModalOpen(false);
    toast({
      title: "Access Revoked",
      description: `Access has been revoked for ${selectedMember?.name}`,
    });
  };

  if (loading) {
    return (
      <Card variant="glass">
        <CardHeader>
          <div className="h-6 w-32 skeleton rounded" />
          <div className="h-4 w-48 skeleton rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 skeleton rounded-full" />
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
    <>
      <Card variant="glass">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {usedSeats} of {maxSeats} seats used
            </CardDescription>
          </div>
          <Button onClick={() => setInviteModalOpen(true)} disabled={usedSeats >= maxSeats}>
            <UserPlus size={16} className="mr-2" />
            Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={member.status === "active" ? "success" : "warning"}>
                    {member.status}
                  </Badge>
                  <Badge variant="outline">
                    {member.role}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedMember(member);
                          setRevokeModalOpen(true);
                        }}
                      >
                        <Trash2 size={14} className="mr-2" />
                        Revoke Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
        <DialogContent className="glass-strong">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Role</label>
              <Select value={inviteRole} onValueChange={(v: "admin" | "member") => setInviteRole(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!inviteEmail || inviting}>
              {inviting ? "Sending..." : "Send Invitation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Access Dialog */}
      <AlertDialog open={revokeModalOpen} onOpenChange={setRevokeModalOpen}>
        <AlertDialogContent className="glass-strong">
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke access for {selectedMember?.name}? They will no longer be able to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevoke} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Revoke Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
