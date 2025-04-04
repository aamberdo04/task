import React from "react";

function TaskCard({ task, onViewDetails }) {
  return (
    <div className="border p-4 rounded bg-white shadow-sm w-full max-w-md">
      {/* Task Name */}
      <h3 className="font-semibold text-lg">{task.taskName}</h3>

      {/* Task Description */}
      <p className="text-sm text-gray-700">{task.taskDescription}</p>

      {/* Due Date with top margin */}
      <p className="text-sm text-gray-500 mt-2">Due: {task.selectedDate}</p>

      {/* Labels for Urgent and Important */}
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

      {/* View Details Button */}
      <button
        className="mt-4 text-blue-500 hover:text-blue-700"
        onClick={() => onViewDetails(task)}
      >
        View Details
      </button>
    </div>
  );
}

export default TaskCard;
