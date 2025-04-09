import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskDetailsModal from "./TaskDetailsModal";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleCompleteTask = (taskId, isCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save updated tasks in local storage
  };

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onViewDetails={handleViewDetails}
            onCompleteTask={handleCompleteTask}
          />
        ))}
      </div>

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={handleCloseModal}
          onCompleteTask={handleCompleteTask}
        />
      )}
    </div>
  );
}

export default TaskManager;
