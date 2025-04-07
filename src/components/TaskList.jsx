import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskDetailsModal from "./TaskDetailsModal";
import AddProject from "./AddProject";
import Notification from "./Notification"; // ✅

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState(""); // ✅
  const [hasLoaded, setHasLoaded] = useState(false); // ✅

  // ✅ Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setHasLoaded(true);
  }, []);

  // ✅ Save tasks to localStorage after load
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  // ✅ Show notification message
  const showNotification = (message) => {
    setNotification(message);
  };

  // ✅ Handle task complete toggle
  const handleCompleteTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, completed: updatedTask.completed } : task
    );
    setTasks(updatedTasks);
  
    // Keep modal in sync
    if (selectedTask && selectedTask.id === updatedTask.id) {
      setSelectedTask({ ...updatedTask });
    }
  
    showNotification(
      updatedTask.completed
        ? "🎉 Task marked as completed!"
        : "✅ Task unmarked."
    );
  };

  // ✅ Handle delete task
  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Show notification
    showNotification("🗑️ Task deleted!");
    setIsModalOpen(false);
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
      {/* ✅ Notification Message */}
      {notification && <Notification message={notification} />}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">To Do</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          onClick={() => setIsVisible(true)}
        >
          Add Task
        </button>
      </div>

      <AddProject
        isVisible={isVisible}
        closePopUp={() => setIsVisible(false)}
        setTasks={setTasks}
        tasks={tasks}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskCategory
          title="🔥 Urgent & Important"
          tasks={urgentImportant}
          bgColor="bg-red-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="🌿 Not Urgent but Important"
          tasks={notUrgentImportant}
          bgColor="bg-green-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="⚡ Urgent but Not Important"
          tasks={urgentNotImportant}
          bgColor="bg-yellow-100"
          onViewDetails={handleViewDetails}
          onCompleteTask={handleCompleteTask}
        />
        <TaskCategory
          title="💤 Not Urgent & Not Important"
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
          showNotification={showNotification} // ✅ pass this down
          onDeleteTask={handleDeleteTask} // ✅ pass delete function down
        />
      )}
    </div>
  );
}

function TaskCategory({ title, tasks, bgColor, onViewDetails, onCompleteTask }) {
  return (
    <div className={`p-4 rounded-xl shadow ${bgColor}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks here</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onViewDetails={onViewDetails}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
