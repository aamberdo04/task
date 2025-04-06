// TaskCard.jsx

function TaskCard({ task, onViewDetails, onCompleteTask }) {
  const handleCheckboxChange = (e) => {
    e.stopPropagation(); // Prevent triggering onViewDetails
    const updatedTask = { ...task, isCompleted: e.target.checked };
    onCompleteTask(updatedTask);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.taskName}
          </h3>
          <p
            className={`text-sm ${
              task.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.taskDescription}
          </p>
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
          <p className="text-xs text-gray-500 mt-1">
            Due: {task.selectedDate}
          </p>
        </div>

        <input
          type="checkbox"
          className="ml-4 mt-2"
          checked={!!task.isCompleted}
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="mt-3 flex justify-center">
        <button
          onClick={() => onViewDetails(task)} // Modal only opens from this button
       className="mt-4 text-blue-500 hover:text-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
