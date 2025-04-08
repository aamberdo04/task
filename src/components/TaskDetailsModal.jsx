import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";  // Make sure to import your EditTask component
function TaskDetailsModal({ task, onClose, onCompleteTask, showNotification, onDeleteTask, onUpdateTask }) {
  const [localTask, setLocalTask] = useState(task);
  const [localNotification, setLocalNotification] = useState("");
  const [showEditModal, setShowEditModal] = useState(false); // State to manage EditTask modal visibility

  // Sync with updated task prop
  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const handleCheckboxChange = (e) => {
    const updatedTask = { ...localTask, completed: e.target.checked };
    setLocalTask(updatedTask); // Update modal state immediately
    onCompleteTask(updatedTask); // Update parent

    setLocalNotification(
      e.target.checked
        ? `<strong>Task Completed</strong><br />${localTask.taskName} has been marked as completed.`
        : `<strong>Task Unmarked</strong><br />${localTask.taskName} is now marked as incomplete.`
    );
    
  };

  const handleDelete = () => {
    onDeleteTask(localTask); // Trigger delete from parent
    showNotification(`**Task Deleted**.<br />"${localTask.taskName}" has been deleted.`, "delete");


  };

  const handleEdit = () => {
    setShowEditModal(true); // Show EditTask modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Close EditTask modal
  };

  const handleUpdateTask = (updatedTask) => {
    setLocalTask(updatedTask);
    onUpdateTask(updatedTask); // ✅ Pass update back up to TaskList
    showNotification("✅ Task updated!");
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <div className="flex justify-between items-center">
        <span
  className={`font-semibold text-2xl ${
    localTask.completed ? "line-through text-gray-400" : ""
  }`}
>
  {localTask.taskName}
</span>

      <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✖</button>
    </div>

    {/* Content */}
    <div className="mt-6 space-y-5 text-base">
      {/* Labels */}
      <div className="flex flex-wrap gap-3">
        {localTask.isUrgent && (
          <span className="inline-block bg-red-500 text-white text-sm py-1.5 px-3 rounded-full">
            Urgent
          </span>
        )}
        {localTask.isImportant && (
          <span className="inline-block bg-yellow-500 text-white text-sm py-1.5 px-3 rounded-full">
            Important
          </span>
        )}
        <span
          className={`inline-block text-sm py-1.5 px-3 rounded-full ${
            localTask.completed
              ? "bg-green-500 text-white"
              : "bg-white text-black border border-gray-500"
          }`}
        >
          {localTask.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Completion checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={localTask.completed}
          onChange={handleCheckboxChange}
          className="w-5 h-5 mr-3"
        />
        <label className="font-semibold text-base">Mark as completed</label>
      </div>

      {/* Due Date */}
      <p className="text-gray-700">
        <strong>Due Date:</strong> {localTask.selectedDate}
      </p>

      {/* Description Box */}
      <div className="rounded-md p-3 bg-gray-50 min-h-[80px]">
        <p className="text-gray-700 whitespace-pre-wrap">
          {localTask.taskDescription?.trim() || "No description provided."}
        </p>
      </div>
    </div>

          {/* Footer with Edit and Delete Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete Task
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
              onClick={handleEdit} // Trigger edit modal
            >
              Edit Task
            </button>
          </div>
        </div>
      </div>

      {/* Show Edit Task Modal if the state is true */}
      {showEditModal && (
        <EditTask
          task={localTask}
          onClose={handleCloseEditModal} // Close the modal without saving
          onSaveChanges={handleUpdateTask} // Save changes and update the task
        />
      )}
    </div>
  );
}

export default TaskDetailsModal;
