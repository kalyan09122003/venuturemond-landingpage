import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Home", path: "/dashboard" },
  { icon: ShoppingCart, label: "Orders", path: "/dashboard/orders" },
  { icon: Receipt, label: "Invoices", path: "/dashboard/invoices" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-border/30">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
