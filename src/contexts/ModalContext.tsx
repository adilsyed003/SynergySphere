import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isProjectModalOpen: boolean;
  isTaskModalOpen: boolean;
  setIsProjectModalOpen: (open: boolean) => void;
  setIsTaskModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isProjectModalOpen,
        isTaskModalOpen,
        setIsProjectModalOpen,
        setIsTaskModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}