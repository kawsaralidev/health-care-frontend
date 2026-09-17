"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DashboardSidebar from "./dashboard-sidebar";

interface DashboardShellProps {
  children: ReactNode;
  role: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
}

const DashboardShell = ({ children, role }: DashboardShellProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardShell;
