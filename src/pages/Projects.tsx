import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { useModal } from "@/contexts/ModalContext";
import websiteImage from "@/assets/project-website.jpg";
import mobileImage from "@/assets/project-mobile.jpg";
import apiImage from "@/assets/project-api.jpg";

// Sample project data
const sampleProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    tags: ["Web Development", "UI/UX", "Frontend"],
    deadline: "2024-03-15",
    manager: {
      name: "Sarah Johnson",
      avatar: ""
    },
    tasksCount: 12,
    image: websiteImage
  },
  {
    id: "2", 
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    tags: ["Mobile App", "React Native", "Backend"],
    deadline: "2024-04-30",
    manager: {
      name: "Mike Chen",
      avatar: ""
    },
    tasksCount: 8,
    image: mobileImage
  },
  {
    id: "3",
    name: "API Integration",
    description: "Integration with third-party APIs for data synchronization",
    tags: ["Backend", "API", "Integration"],
    deadline: "2024-02-28",
    manager: {
      name: "Alex Rivera",
      avatar: ""
    },
    tasksCount: 5,
    image: apiImage
  }
];

export function Projects() {
  const [projects, setProjects] = useState(sampleProjects);
  const [editingProject, setEditingProject] = useState<any>(null);
  const { isProjectModalOpen, setIsProjectModalOpen } = useModal();

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      tasksCount: 0,
      manager: {
        name: "Current User",
        avatar: ""
      }
    };
    setProjects(prev => [...prev, newProject]);
    setIsProjectModalOpen(false);
  };

  const handleEditProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setEditingProject(project);
  };

  const handleUpdateProject = (projectData: any) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...projectData }
          : p
      )
    );
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleProjectClick = (projectId: string) => {
    // Navigate to project detail view (TODO: implement routing)
    console.log("Navigate to project:", projectId);
  };


  return (
    <div className="space-y-6">
      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
          <Button onClick={() => setIsProjectModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Create Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ProjectForm 
            onSubmit={handleCreateProject}
            onCancel={() => setIsProjectModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Project Modal */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {editingProject && (
            <ProjectForm 
              initialData={editingProject}
              onSubmit={handleUpdateProject}
              onCancel={() => setEditingProject(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}