import { SidebarRoute } from "@/types/sidebar.type";

export const adminRoutes: SidebarRoute[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
      },
    ],
  },
  {
    title: "Doctor Management",
    items: [
      {
        title: "Approve Doctor",
        url: "/admin/approve-doctor",
      },
    ],
  },
];
