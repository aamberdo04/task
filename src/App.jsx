import React from "react";
import { TaskProvider } from './context/TaskContext';
import AddProject from "./components/AddProject";
import Todo from "./util/Todo"
import TaskList from "./components/TaskList";


function App() {
    return (
        <TaskProvider>
            <h1 className="text-2xl font-bold text-center my-6">Task Manager</h1>
            <AddProject />
            <TaskList /> {/* Display categorized tasks */}
        </TaskProvider>
    );

  }
  

export default App;