import React from "react";

function TaskDetailsModal({ task, onClose, onCompleteTask }) {
  const handleCheckboxChange = (e) => {
    const updatedTask = { ...task, isCompleted: e.target.checked };
    onCompleteTask(updatedTask); // Update the completion status
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-xl">{task.taskName}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </div>

        {/* Task Info */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3
              className={`font-semibold text-lg ${
                task.isCompleted ? "line-through text-gray-500" : ""
              }`}
            >
              {task.taskName}
            </h3>

            {/* Completion Checkbox */}
            <input
              type="checkbox"
              checked={task.isCompleted || false}
              onChange={handleCheckboxChange}
              className="ml-4"
            />
          </div>

          <p className="text-sm text-gray-700 mt-2">
            <strong>Description:</strong> {task.taskDescription}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Due Date:</strong> {task.selectedDate}
          </p>

          {/* Labels */}
          <div className="mt-2">
            {task.isUrgent && (
              <span className="inline-block bg-red-500 text-white text-xs py-1 px-2 rounded-full mr-2">
                Urgent
              </span>
            )}
            {task.isImportant && (
              <span className="inline-block bg-yellow-500 text-white text-xs py-1 px-2 rounded-full">
                Important
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
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