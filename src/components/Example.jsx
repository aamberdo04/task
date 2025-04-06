import React from "react";

function TaskDetailsModal({ task, onClose, onCompleteTask }) {
  const handleCheckboxChange = () => {
    onCompleteTask(task); // Trigger task completion toggle
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3
          className={`text-2xl font-semibold mb-4 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p
          className={`mb-4 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.description}
        </p>

        {/* Display task status */}
        <p className="text-sm mb-4">
          Status: {task.completed ? "Completed" : "Pending"}
        </p>

        {/* Checkbox to mark task as completed */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>Mark as completed</span>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
