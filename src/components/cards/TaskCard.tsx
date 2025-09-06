import { MoreVertical, Calendar, Clock, Flag } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    name: string;
    description?: string;
    tags: string[];
    deadline?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
    assignee: {
      name: string;
      avatar?: string;
    };
    project: {
      name: string;
    };
    image?: string;
  };
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onClick?: (taskId: string) => void;
}

const priorityColors = {
  low: "text-success",
  medium: "text-warning", 
  high: "text-destructive"
};

const statusColors = {
  'todo': "bg-muted text-muted-foreground",
  'in-progress': "bg-primary/10 text-primary",
  'done': "bg-success/10 text-success"
};

export function TaskCard({ task, onEdit, onDelete, onClick }: TaskCardProps) {
  const handleCardClick = () => {
    onClick?.(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(task.id);
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Task Image */}
        {task.image && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img
              src={task.image}
              alt={task.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          {/* Header with tags and menu */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{task.tags.length - 2}
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

          {/* Task Name */}
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {task.name}
          </h3>

          {/* Project Name */}
          <p className="text-sm text-muted-foreground mb-2">
            {task.project.name}
          </p>

          {/* Task Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Status and Priority */}
          <div className="flex items-center gap-2 mb-3">
            <Badge className={cn("text-xs", statusColors[task.status])}>
              {task.status.replace('-', ' ')}
            </Badge>
            <div className={cn("flex items-center gap-1 text-xs", priorityColors[task.priority])}>
              <Flag size={12} />
              <span className="capitalize">{task.priority}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              {/* Deadline */}
              {task.deadline && (
                <div className={cn(
                  "flex items-center gap-1",
                  isOverdue ? "text-destructive" : "text-muted-foreground"
                )}>
                  <Calendar size={14} />
                  <span>{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Assignee Avatar */}
            <Avatar className="w-8 h-8">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback>
                {task.assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}