import React from "react";

function AddTaskButton({ taskName, onClick, disabled }) {
    return (
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
            onClick={onClick}
            disabled={disabled} // Disabled if taskName is empty
        >
            Add Task
        </button>
    );
}

export default AddTaskButton;
