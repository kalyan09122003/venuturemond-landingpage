import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Server,
  Users,
  HeadphonesIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  PieChart,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/client/projects" },
  { icon: Server, label: "Services", path: "/client/services" },
  { icon: ShoppingCart, label: "Cart", path: "/client/cart" },
  { icon: Package, label: "Orders", path: "/client/orders" },
  { icon: Receipt, label: "Invoices", path: "/client/invoices" },
  { icon: Users, label: "Team", path: "/client/team" },
  { icon: PieChart, label: "Analytics", path: "/client/analytics" },
  { icon: HeadphonesIcon, label: "Support", path: "/client/support" },
  { icon: Settings, label: "Settings", path: "/client/settings" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="VentureMond Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gradient">VentureMond</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-sidebar-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                    isActive && "bg-sidebar-accent text-foreground border-l-2 border-primary"
                  )}
                >
                  <item.icon size={20} className={cn(isActive && "text-primary")} />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border">
        <NavLink
          to="/logout"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </NavLink>
      </div>
    </aside>
  );
}