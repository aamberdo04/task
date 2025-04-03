// TaskCategory.js
import React from "react";
import TaskCard from "./TaskCard";
import ImportantUrgentLabel from "../util/ImportantLabel"

const TaskCategory = ({ title, tasks, bgColor, importantLabel, urgentLabel }) => (
    <div className={`p-4 rounded-md shadow ${bgColor} min-h-[300px]`}>
        <h3 className="font-semibold mb-2">{title}</h3>
        <ImportantUrgentLabel importantLabel={importantLabel} urgentLabel={urgentLabel} /> {/* Using the badge component */}
        {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500">No tasks available</p>
        )}
    </div>
);

export default TaskCategory;
