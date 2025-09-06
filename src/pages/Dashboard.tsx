import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Plus, MoreHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useModal } from "@/contexts/ModalContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { setIsProjectModalOpen, setIsTaskModalOpen } = useModal();

  // Auto-collapse sidebar on mobile
  const shouldCollapse = isMobile || sidebarCollapsed;

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length > 1) {
      breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });
      
      if (pathSegments[1] === 'projects') {
        breadcrumbs.push({ label: 'Projects' });
      } else if (pathSegments[1] === 'tasks') {
        breadcrumbs.push({ label: 'My Tasks' });
      }
    }

    return breadcrumbs;
  };

  // Generate action buttons based on current path
  const generateActions = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments[1] === 'projects') {
      return (
        <>
          <Button variant="outline" size="sm">
            <MoreHorizontal size={16} className="mr-2" />
            More
          </Button>
          <Button size="sm" onClick={() => setIsProjectModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            New Project
          </Button>
        </>
      );
    } else if (pathSegments[1] === 'tasks') {
      return (
        <>
          <Button variant="outline" size="sm">
            <MoreHorizontal size={16} className="mr-2" />
            More
          </Button>
          <Button size="sm" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            New Task
          </Button>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 md:relative md:translate-x-0",
          shouldCollapse && isMobile ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <Sidebar collapsed={shouldCollapse} onToggle={toggleSidebar} />
      </div>

      {/* Mobile overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          onSidebarToggle={toggleSidebar}
          breadcrumbs={generateBreadcrumbs()}
          actions={generateActions()}
        />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}