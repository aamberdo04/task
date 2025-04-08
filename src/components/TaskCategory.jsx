// TaskCategory.js
import React from "react";
import TaskCard from "./TaskCard";
import ImportantUrgentLabel from "../util/ImportantLabel"

const TaskCategory = ({ title, subtitle, tasks, bgColor, importantLabel, urgentLabel }) => (
    <div className={`p-4 rounded-md shadow ${bgColor} min-h-[300px]`}>
        <h3 className="font-semibold text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mb-2">{subtitle}</p>}
        <ImportantUrgentLabel importantLabel={importantLabel} urgentLabel={urgentLabel} />
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
