import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskDetailsModal from "./TaskDetailsModal";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: "Sample Task",
      taskDescription: "This is a test task",
      selectedDate: "2025-04-10",
      isUrgent: true,
      isImportant: false,
      isCompleted: false,
    },
    // Add more tasks here...
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleCompleteTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    // Only update modal if it's already open
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onViewDetails={openTaskDetailsModal}
          onCompleteTask={handleCompleteTask}
        />
      ))}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={closeTaskDetailsModal}
          onCompleteTask={handleCompleteTask}
        />
      )}
    </div>
  );
}

export default TaskList;