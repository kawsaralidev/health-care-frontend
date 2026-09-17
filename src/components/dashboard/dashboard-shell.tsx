"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DashboardSidebar from "./dashboard-sidebar";

interface DashboardShellProps {
  children: ReactNode;
  userRole: "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
}

const DashboardShell = ({ children, userRole }: DashboardShellProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar userRole={userRole} />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardShell;
