import React from "react";

// Utility function to delete task from localStorage and update state
const deleteTaskFromStorage = (tasks, taskToDelete) => {
  // Filter out the task that needs to be deleted
  const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
  // Update localStorage with the new tasks list
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
};

const DeleteTask = ({ task, onClose, tasks, setTasks, showNotification }) => {
  // Handle task deletion
  const handleDeleteTask = () => {
    // Delete the task from the state and localStorage
    const updatedTasks = deleteTaskFromStorage(tasks, task);
    setTasks(updatedTasks); // Update tasks state

    // Show notification after deleting the task
    showNotification("🗑️ Task has been deleted!");

    // Close the modal after deletion
    onClose();
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
        onClick={handleDeleteTask}
      >
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;
