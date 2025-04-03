import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddProject from "./AddProject";  // Import the AddProject component for adding new tasks

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // State to control Add Project popup visibility

    // Fetch tasks from localStorage on component mount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    // Debugging: Log the tasks each time they are updated
    useEffect(() => {
        console.log("Updated Tasks in TaskList:", tasks);
    }, [tasks]);

    // Categorize tasks into four sections
    const urgentImportant = tasks.filter(task => task.isUrgent && task.isImportant);
    const importantNotUrgent = tasks.filter(task => !task.isUrgent && task.isImportant);
    const urgentNotImportant = tasks.filter(task => task.isUrgent && !task.isImportant);
    const neither = tasks.filter(task => !task.isUrgent && !task.isImportant);

    return (
        <div className="p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">To Do</h2>
                {/* Add Task Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                    onClick={() => setIsVisible(true)} // Show the Add Project popup when clicked
                >
                    Add Task
                </button>
            </div>

            {/* Add Project Popup (Modal) */}
            <AddProject 
                isVisible={isVisible} 
                closePopUp={() => setIsVisible(false)} 
                setTasks={setTasks} 
            />

            {/* Display tasks in categories */}
            <div className="grid grid-cols-2 gap-6">
                <TaskCategory title="🔥 Urgent & Important" tasks={urgentImportant} bgColor="bg-red-200" />
                <TaskCategory title="⭐ Important but Not Urgent" tasks={importantNotUrgent} bgColor="bg-yellow-200" />
                <TaskCategory title="⚡ Urgent but Not Important" tasks={urgentNotImportant} bgColor="bg-orange-200" />
                <TaskCategory title="✅ Not Urgent & Not Important" tasks={neither} bgColor="bg-gray-200" />
            </div>
        </div>
    );
};

// Reusable TaskCategory Component
const TaskCategory = ({ title, tasks, bgColor }) => (
    <div className={`p-4 rounded-md shadow ${bgColor} h-[300px]`}>
        <h3 className="font-semibold mb-2">{title}</h3>
        {tasks.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500">No tasks available</p>
        )}
    </div>
);

export default TaskList;
