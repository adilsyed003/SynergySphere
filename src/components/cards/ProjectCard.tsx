import { MoreVertical, Calendar, Users, CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    tags: string[];
    deadline?: string;
    manager: {
      name: string;
      avatar?: string;
    };
    tasksCount: number;
    image?: string;
  };
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onClick?: (projectId: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete, onClick }: ProjectCardProps) {
  const handleCardClick = () => {
    onClick?.(project.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(project.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(project.id);
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Project Image */}
        {project.image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          {/* Header with tags and menu */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 2}
                </Badge>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Project Name */}
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {project.name}
          </h3>

          {/* Project Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {/* Deadline */}
              {project.deadline && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              )}
              
              {/* Tasks Count */}
              <div className="flex items-center gap-1">
                <CheckSquare size={14} />
                <span>{project.tasksCount} tasks</span>
              </div>
            </div>

            {/* Manager Avatar */}
            <Avatar className="w-8 h-8">
              <AvatarImage src={project.manager.avatar} />
              <AvatarFallback>
                {project.manager.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}