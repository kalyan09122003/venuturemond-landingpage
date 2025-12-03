import { useEffect, useState } from "react";
import { TeamManagement } from "@/components/dashboard/TeamManagement";
import { mockTeamMembers, type TeamMember } from "@/lib/mock-data";

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMembers(mockTeamMembers);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Team & Permissions</h1>
        <p className="text-muted-foreground">Manage your team members and their access levels.</p>
      </div>

      <TeamManagement members={members} maxSeats={10} loading={loading} />
    </div>
  );
}
