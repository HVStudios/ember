import { BarChart3, Dumbbell, Home, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/", label: "Hem", icon: Home, end: true },
  { to: "/program", label: "Program", icon: Dumbbell },
  { to: "/progress", label: "Utveckling", icon: BarChart3 },
  { to: "/settings", label: "Inställningar", icon: Settings },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <main className="app-main"><Outlet /></main>
      <nav className="bottom-nav" aria-label="Huvudmeny">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}>
            <Icon size={21} strokeWidth={2} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
