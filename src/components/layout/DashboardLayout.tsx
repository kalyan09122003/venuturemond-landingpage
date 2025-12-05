import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { MobileQuickActions } from "./MobileQuickActions";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  LogOut,
  X,
  FolderKanban,
  Package,
  PieChart,
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

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Mobile Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="VentureMond Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gradient">VentureMond</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          <nav className="py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
                        isActive && "bg-sidebar-accent text-foreground border-l-2 border-primary"
                      )}
                    >
                      <item.icon size={20} className={cn(isActive && "text-primary")} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <NavLink
              to="/logout"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Log out</span>
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
      <MobileQuickActions />
    </div>
  );
}