import { render, screen, fireEvent } from "@testing-library/react";
import EditTask from "../components/EditTask";
import { vi } from "vitest";

// pass sample data to render
it("renders with pre-filled data", () => {
    const mockTask = {
        id: 1,
        taskName: "Edit me",
        taskDescription: "Old description",
        selectedDate: "2025-04-09",
        isUrgent: true,
        isImportant: false,
    };

    render(<EditTask task={mockTask} onClose={() => { }} onSaveChanges={() => { }} />);

    expect(screen.getByDisplayValue("Edit me")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old description")).toBeInTheDocument();
});

// test case: when task name is empty, save changes disable
it("disables Save Changes button when task name is empty", () => {
    const task = { id: 1, taskName: "", taskDescription: "" };
    render(<EditTask task={task} onClose={() => { }} onSaveChanges={() => { }} />);

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    expect(saveButton).toBeDisabled();
});

// test case: when cancel button is clicked 
it("calls onClose when Cancel is clicked", () => {
    const mockTask = { id: 1, taskName: "Task" };
    const mockClose = vi.fn();

    render(<EditTask task={mockTask} onSaveChanges={() => { }} onClose={mockClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockClose).toHaveBeenCalled();
});

// test case: when save changes button is clicked
it("calls onSaveChanges with updated task when Save Changes is clicked", () => {
    const mockTask = {
        id: 1,
        taskName: "Old name",
        taskDescription: "Old desc",
        selectedDate: "2025-04-09",
        isUrgent: false,
        isImportant: false,
    };
    const mockSaveChanges = vi.fn();
    const mockClose = vi.fn();

    render(
        <EditTask
            task={mockTask}
            onClose={mockClose}
            onSaveChanges={mockSaveChanges}
        />
    );

    // test case: update task name
    fireEvent.change(screen.getByPlaceholderText("Task Name"), {
        target: { value: "Updated name" },
    });

    // test case: click save changes button to update
    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));

    expect(mockSaveChanges).toHaveBeenCalledWith(
        expect.objectContaining({ taskName: "Updated name" })
    );
    expect(mockClose).toHaveBeenCalled(); 
});
