import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationsDropdown } from "@/components/ui/NotificationsDropdown";
import { UserDropdown } from "@/components/ui/UserDropdown";
import { mockApi } from "@/lib/mockApi";
import { useEffect, useState } from "react";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await mockApi.getOverviewData();
    setNotifications(data.notifications || []);
  };

  const handleMarkRead = async (id: string) => {
    const updated = await mockApi.markNotificationRead(id);
    setNotifications(updated);
  };

  return (
    <header className="sticky top-0 z-40 h-16 glass-strong border-b border-border/30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search orders, invoices..."
              className="pl-10 bg-secondary/30 border-border/50"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationsDropdown notifications={notifications} onMarkRead={handleMarkRead} />

          {/* User menu */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
