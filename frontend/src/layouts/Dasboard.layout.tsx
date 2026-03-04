import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/AppSidebar';
import { Outlet } from 'react-router';

function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen = {true} open = {true}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
