import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { TaskProvider } from "../context/TaskContext"; 
import { vi } from "vitest";

const renderWithProvider = (ui) => {
  return render(<TaskProvider>{ui}</TaskProvider>);
};

it("loads tasks from localStorage when mounted", () => {
  const mockTasks = [
    { id: 1, taskName: "Test Task", isUrgent: true, isImportant: true },
  ];
  localStorage.setItem("tasks", JSON.stringify(mockTasks));
  renderWithProvider(<TaskList />); 
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

it("opens Add Task modal when 'Add Task' button is clicked", () => {
  renderWithProvider(<TaskList />); 
  fireEvent.click(screen.getByRole("button", { name: /Add Task/i }));
  expect(screen.getByPlaceholderText("Task Name")).toBeInTheDocument();
});

it("shows 'No task in this quadrant' message when no tasks exist", () => {
    localStorage.setItem("tasks", JSON.stringify([]));
    renderWithProvider(<TaskList />);
    expect(screen.getAllByText(/No task in this quadrant/i).length).toBe(4);
});
it("opens Edit Task modal with task data", () => {
    const task = {
      id: 1,
      taskName: "Edit Me",
      taskDescription: "Old description",
      isUrgent: false,
      isImportant: true,
    };
    localStorage.setItem("tasks", JSON.stringify([task]));
  
    renderWithProvider(<TaskList />);
    fireEvent.click(screen.getByText("Edit Me"));
    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
  
    expect(screen.getByDisplayValue("Edit Me")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old description")).toBeInTheDocument();
});
it("marks a task as complete and shows notification", () => {
    const mockTask = {
      id: 1,
      taskName: "Finish report",
      isUrgent: true,
      isImportant: true,
      completed: false,
    };
    localStorage.setItem("tasks", JSON.stringify([mockTask]));
  
    renderWithProvider(<TaskList />);
    fireEvent.click(screen.getByText("Finish report"));
    const checkbox = screen.getByTestId("modal-complete-checkbox");
    fireEvent.click(checkbox);
  
    expect(screen.getByText(/Task Completed/i)).toBeInTheDocument();
});
  
  
  
