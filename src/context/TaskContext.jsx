import React, { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const value = {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskDate,
    setTaskDate,
    isImportant,
    setIsImportant,
    isUrgent,
    setIsUrgent,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
