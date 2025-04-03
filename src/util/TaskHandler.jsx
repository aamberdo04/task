export const handleAddTask = (
    taskName,
    taskDescription,
    isUrgent,
    isImportant,
    selectedDate,
    setTaskName,
    setTaskDescription,
    setSelectedDate,
    setUrgent,
    setImportant,
    closePopUp
) => {
    // Create the new task object
    const newTask = {
        id: Date.now(),  // Unique ID based on time
        name: taskName,
        description: taskDescription,
        isUrgent,
        isImportant,
        dueDate: selectedDate,
    };

    // Save task to localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset the form fields
    setTaskName("");
    setTaskDescription("");
    setSelectedDate(null);
    setUrgent(false);
    setImportant(false);

    // Close the pop-up
    closePopUp();
};
