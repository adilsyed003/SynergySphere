import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TaskCard } from "@/components/cards/TaskCard";
import { TaskForm } from "@/components/forms/TaskForm";
import { useModal } from "@/contexts/ModalContext";

// Sample task data
const sampleTasks = [
  {
    id: "1",
    name: "Design Homepage Layout",
    description: "Create wireframes and mockups for the new homepage design",
    tags: ["UI/UX", "Design"],
    deadline: "2024-02-15",
    priority: "high" as const,
    status: "in-progress" as const,
    assignee: {
      name: "Current User",
      avatar: ""
    },
    project: {
      name: "Website Redesign"
    },
    image: ""
  },
  {
    id: "2",
    name: "API Documentation",
    description: "Complete documentation for REST API endpoints",
    tags: ["Documentation", "Backend"],
    deadline: "2024-02-20",
    priority: "medium" as const,
    status: "todo" as const,
    assignee: {
      name: "Current User",
      avatar: ""
    },
    project: {
      name: "API Integration"
    },
    image: ""
  },
  {
    id: "3",
    name: "User Authentication",
    description: "Implement login and registration functionality",
    tags: ["Backend", "Security"],
    deadline: "2024-02-10",
    priority: "high" as const,
    status: "done" as const,
    assignee: {
      name: "Current User", 
      avatar: ""
    },
    project: {
      name: "Mobile App Development"
    },
    image: ""
  }
];

export function Tasks() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [editingTask, setEditingTask] = useState<any>(null);
  const { isTaskModalOpen, setIsTaskModalOpen } = useModal();

  const handleCreateTask = (taskData: any) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      status: 'todo' as const,
      assignee: {
        name: "Current User",
        avatar: ""
      },
      project: {
        name: "Default Project" // Should be selected from form
      }
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setEditingTask(task);
  };

  const handleUpdateTask = (taskData: any) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...taskData }
          : t
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleTaskClick = (taskId: string) => {
    // Navigate to task detail view (TODO: implement routing)
    console.log("Navigate to task:", taskId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
        <p className="text-muted-foreground">Tasks assigned to you across all projects</p>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">Tasks assigned to you will appear here</p>
          <Button onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Create Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onClick={handleTaskClick}
            />
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <TaskForm 
            onSubmit={handleCreateTask}
            onCancel={() => setIsTaskModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {editingTask && (
            <TaskForm 
              initialData={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}