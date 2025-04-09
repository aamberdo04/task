import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskDetailsModal from "./TaskDetailsModal";
import AddProject from "./AddProject";
import Notification from "../util/Notification"
import EditTask from "./EditTask";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setHasLoaded(true);
  }, []);
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
  };

  const handleCompleteTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, completed: updatedTask.completed } : task
    );
    setTasks(updatedTasks);
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask({ ...updatedTask });
    }
    showNotification(
      updatedTask.completed
        ? `<strong>Task Completed</strong><br />${updatedTask.taskName} has been marked as completed.`
        : `<strong>Task Unmarked</strong><br />${updatedTask.taskName} is now marked as incomplete.`
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    showNotification("🗑️ Task deleted!");
    setIsModalOpen(false);
  };
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      String(task.id) === String(updatedTask.id) ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsEditModalOpen(false);
    showNotification("✅ Task updated!");
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const urgentImportant = tasks.filter((task) => task.isUrgent && task.isImportant);
  const notUrgentImportant = tasks.filter((task) => !task.isUrgent && task.isImportant);
  const urgentNotImportant = tasks.filter((task) => task.isUrgent && !task.isImportant);
  const notUrgentNotImportant = tasks.filter((task) => !task.isUrgent && !task.isImportant);

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">To Do</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          onClick={() => setIsVisible(true)} // Open AddProject modal
        >
          Add Task
        </button>
      </div>

      <AddProject
        isVisible={isVisible}
        closePopUp={() => setIsVisible(false)}
        setTasks={setTasks}
        tasks={tasks}
        showNotification={showNotification} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskCategory
          title="Do"
          subtitle="Urgent and Important"
          tasks={urgentImportant}
          bgColor="bg-red-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="Schedule"
          subtitle="Not Urgent & Important"
          tasks={notUrgentImportant}
          bgColor="bg-green-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="Delegate"
          subtitle="Urgent & Not Important"
          tasks={urgentNotImportant}
          bgColor="bg-yellow-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="Eliminate"
          subtitle="Not Urgent & Not Important"
          tasks={notUrgentNotImportant}
          bgColor="bg-gray-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
      </div>

      {isModalOpen && selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={handleCloseModal}
          onCompleteTask={handleCompleteTask}
          showNotification={showNotification}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
      {isEditModalOpen && selectedTask && (
        <EditTask
          task={selectedTask}
          onClose={() => setIsEditModalOpen(false)}
          onSaveChanges={handleUpdateTask}
        />
      )}
    </div>
  );

  function TaskCategory({ title, subtitle, tasks, bgColor, onViewDetails, onCompleteTask }) {
    return (
      <div className={`p-4 rounded-xl shadow ${bgColor} flex flex-col justify-start`}>
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1 mb-4 leading-snug">
            {subtitle}
          </p>
        )}

        {tasks.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-md px-4 py-6 bg-white/60 text-center text-gray-600 text-sm">
            No task in this quadrant
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onViewDetails={onViewDetails}
                onCompleteTask={onCompleteTask}
                onEditTask={handleEditTask}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default TaskList;
