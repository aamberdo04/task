import React, { useEffect, useState } from "react";

function TaskDetailsModal({ task, onClose, onCompleteTask, showNotification, onDeleteTask }) {
  const [localTask, setLocalTask] = useState(task);
  const [localNotification, setLocalNotification] = useState("");

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
        ? "🎉 Task marked as completed!"
        : "✅ Task unmarked."
    );
  };

  const handleDelete = () => {
    onDeleteTask(localTask); // Trigger delete from parent
    showNotification("🗑️ Task deleted!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">{localTask.taskName}</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✖</button>
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-lg ${localTask.completed ? "line-through text-gray-500" : ""}`}>
              {localTask.taskName}
            </h3>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={localTask.completed}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span>Mark as completed</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-2">
            <strong>Description:</strong> {localTask.taskDescription}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Due Date:</strong> {localTask.selectedDate}
          </p>

          <div className="mt-2">
            {localTask.isUrgent && (
              <span className="inline-block bg-red-500 text-white text-xs py-1 px-2 rounded-full mr-2">Urgent</span>
            )}
            {localTask.isImportant && (
              <span className="inline-block bg-yellow-500 text-white text-xs py-1 px-2 rounded-full">Important</span>
            )}
            <span className={`inline-block text-xs py-1 px-2 rounded-full ${localTask.completed ? "bg-green-500 text-white" : "bg-white text-black border border-gray-500"}`}>
              {localTask.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
