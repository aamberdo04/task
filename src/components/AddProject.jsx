import React, { useState } from "react";
import { useTask } from "../context/TaskContext"; // Importing the context
import TaskOptions from "./TaskOptions";
import DateValidation from "./DateValidation";

function AddProject({ isVisible, closePopUp, setTasks }) {
    const { taskName, setTaskName, taskDescription, setTaskDescription } = useTask();
    const [isUrgent, setUrgent] = useState(false);
    const [isImportant, setImportant] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Only render modal if visible
    if (!isVisible) return null;
    window.localStorage.removeItem('tasks')

    // Handle adding a task
    const addTaskAndUpdateList = () => {
        if (!taskName.trim()) return; // Prevent adding empty tasks

        const newTask = {
            id: Date.now(), // Use current timestamp as ID
            taskName,
            taskDescription,
            isUrgent,
            isImportant,
            selectedDate: selectedDate || new Date().toLocaleDateString(), // Default to today's date if no date selected
        };

        console.log("New Task to Add:", newTask); // Log to check task being added

        // Update the task list in the parent component (TaskList)
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
            return updatedTasks;
        });

        // Reset inputs
        setTaskName('');
        setTaskDescription('');
        setSelectedDate(null);
        setUrgent(false);
        setImportant(false);

        // Close modal
        closePopUp();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-[20px] mt-1">Add New Task</span>
                    <button onClick={closePopUp} className="text-gray-500 hover:text-gray-800">✖</button>
                </div>

                {/* Task Name Input */}
                <div className="flex flex-col gap-2 mt-6 px-3">
                    <span className="text-sm opacity-80 md:font-bold">Add Task</span>
                    <input
                        className="border w-full border-gray-200 outline-none p-3 rounded-md text-[12px]"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>

                {/* Task Description */}
                <div className="flex flex-col gap-2 mt-6 mx-3">
                    <label htmlFor="message" className="md:font-bold block text-sm font-medium text-gray-900">
                        Add Description
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder="Your message..."
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>

                {/* Date Picker Component */}
                <DateValidation selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                {/* Task Options (Urgent & Important Toggles) */}
                <TaskOptions 
                    isUrgent={isUrgent} 
                    setUrgent={setUrgent} 
                    isImportant={isImportant} 
                    setImportant={setImportant} 
                />

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-6 px-3">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600"
                        onClick={closePopUp}
                    >
                        Cancel
                    </button>
                    <button
                        className={`py-2 px-4 rounded-md shadow-sm text-white ${taskName.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                        onClick={addTaskAndUpdateList}
                        disabled={!taskName.trim()}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProject;
