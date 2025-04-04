// TaskDetails.js
import React, { useState } from "react";

function TaskDetails({ taskName, taskDescription, selectedDate, isUrgent, isImportant }) {
    const [taskDetailsVisible, setTaskDetailsVisible] = useState(false);

    const toggleTaskDetails = () => {
        setTaskDetailsVisible((prevState) => !prevState);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-4">
            <div className="flex justify-between items-center">
                <span className="font-semibold">{taskName}</span>
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={toggleTaskDetails}
                >
                    {taskDetailsVisible ? "Hide Details" : "View Details"}
                </button>
            </div>
            {taskDetailsVisible && (
                <div className="mt-3">
                    <p><strong>Description:</strong> {taskDescription}</p>
                    <p><strong>Due Date:</strong> {selectedDate}</p>
                    <p><strong>Urgent:</strong> {isUrgent ? "Yes" : "No"}</p>
                    <p><strong>Important:</strong> {isImportant ? "Yes" : "No"}</p>
                </div>
            )}
        </div>
    );
}

export default TaskDetails;
