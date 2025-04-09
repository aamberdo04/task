import React from "react";

const deleteTaskFromStorage = (tasks, taskToDelete) => {

  const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
};

const DeleteTask = ({ task, onClose, tasks, setTasks, showNotification }) => {

  const handleDeleteTask = () => {

    const updatedTasks = deleteTaskFromStorage(tasks, task);
    setTasks(updatedTasks);

    showNotification("🗑️ Task has been deleted!");

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
