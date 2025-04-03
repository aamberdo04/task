import React, { useState, useEffect } from "react";
import AddProject from "./AddProject"; // Import AddProject component

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Load tasks from localStorage when the component first mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    return (
        <div>
            {/* Button to open the modal */}
            <button onClick={() => setIsModalVisible(true)}>Add Task</button>

            {/* Pass tasks and setTasks to AddProject */}
            <AddProject
                isVisible={isModalVisible}
                closePopUp={() => setIsModalVisible(false)}
                setTasks={setTasks}
            />

            {/* Display tasks */}
            <div>
                <h2>Tasks:</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div>{task.taskName}</div>
                            <p>{task.taskDescription}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskManager;
