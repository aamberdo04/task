import React from "react";

function TaskDetailsModal({ task, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">Task Details</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>
        <div className="mt-4">
          <p><strong>Task Name:</strong> {task.taskName}</p>
          <p><strong>Description:</strong> {task.taskDescription}</p>
          <p><strong>Due Date:</strong> {task.selectedDate}</p>
          <p><strong>Urgent:</strong> {task.isUrgent ? "Yes" : "No"}</p>
          <p><strong>Important:</strong> {task.isImportant ? "Yes" : "No"}</p>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
