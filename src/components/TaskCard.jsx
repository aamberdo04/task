function TaskCard({ task, onViewDetails, onCompleteTask }) {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    const updatedTask = { ...task, completed: e.target.checked };
    onCompleteTask(updatedTask);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        {/* Task content */}
        <div
          onClick={() => onViewDetails(task)}
          className={`flex-1 cursor-pointer ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.taskName}
          </h3>
          <p
            className={`text-sm mt-1 ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.taskDescription || "No description."}
          </p>

          {/* Labels */}
          <div className="mt-2 flex flex-wrap gap-2">
            {task.isUrgent && (
              <span className="inline-block bg-red-500 text-white text-xs py-1 px-3 rounded-full">
                Urgent
              </span>
            )}
            {task.isImportant && (
              <span className="inline-block bg-yellow-500 text-white text-xs py-1 px-3 rounded-full">
                Important
              </span>
            )}
            <span
              className={`inline-block text-xs py-1 px-3 rounded-full ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-white border border-gray-400 text-gray-800"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Bold Due Date */}
          <p className="text-xs text-gray-700 mt-2">
            <span className="font-semibold">Due:</span>{" "}
            <span className="font-normal text-gray-500">{task.selectedDate}</span>
          </p>
        </div>

        {/* Checkbox */}
        <div className="pl-4 pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 accent-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* View Details always full opacity */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(task);
          }}
          className="text-sm font-medium text-blue-500 hover:text-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
