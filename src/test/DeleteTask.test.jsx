import { render, screen, fireEvent } from "@testing-library/react";
import DeleteTask from "../components/DeleteTask";
import { vi } from "vitest";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks(); 
});

describe("DeleteTask", () => {
  //Test: Delete button renders correctly
  it("renders Delete Task button", () => {
    render(
      <DeleteTask
        task={{ id: 1 }}
        onClose={() => {}}
        tasks={[{ id: 1, taskName: "Test Task" }]}
        setTasks={() => {}}
        showNotification={() => {}}
      />
    );

    // Check if the button is in the document
    expect(screen.getByRole("button", { name: /Delete Task/i })).toBeInTheDocument();
  });

  // test case: Calls setTasks, showNotification, and onClose when clicked
  it("deletes the task and triggers callbacks", () => {
    const taskToDelete = { id: 1, taskName: "Task to delete" };
    const tasks = [taskToDelete, { id: 2, taskName: "Other task" }];
    const mockSetTasks = vi.fn();
    const mockNotification = vi.fn();
    const mockClose = vi.fn();

    // Set localStorage before test
    localStorage.setItem("tasks", JSON.stringify(tasks));

    render(
      <DeleteTask
        task={taskToDelete}
        tasks={tasks}
        setTasks={mockSetTasks}
        showNotification={mockNotification}
        onClose={mockClose}
      />
    );

    // Click the Delete button
    fireEvent.click(screen.getByRole("button", { name: /Delete Task/i }));

    // Expect setTasks to be called with the updated list (task 1 removed)
    expect(mockSetTasks).toHaveBeenCalledWith([{ id: 2, taskName: "Other task" }]);

    // Expect notification to show a message task has deleted
    expect(mockNotification).toHaveBeenCalledWith("🗑️ Task has been deleted!");

    // Expect the modal to close
    expect(mockClose).toHaveBeenCalled();

    // Check localStorage update of deleted task
    const stored = JSON.parse(localStorage.getItem("tasks"));
    expect(stored).toEqual([{ id: 2, taskName: "Other task" }]);
  });
});
