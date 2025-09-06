import { Search, Settings, MoreHorizontal, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSidebarToggle: () => void;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}

export function Header({ onSidebarToggle, breadcrumbs = [], actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="md:hidden"
          >
            <Menu size={20} />
          </Button>
          
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search projects, tasks..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Breadcrumbs and actions row */}
      {(breadcrumbs.length > 0 || actions) && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                <span className={cn(
                  index === breadcrumbs.length - 1 
                    ? "text-foreground font-medium" 
                    : "hover:text-foreground cursor-pointer"
                )}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>

          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
    </header>
  );
}