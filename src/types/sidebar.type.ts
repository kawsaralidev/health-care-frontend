export interface SidebarRouteItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface SidebarRoute {
  title: string;
  items: SidebarRouteItem[];
}
