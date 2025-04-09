import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskDetailsModal from "../components/TaskDetailsModal"; // adjust path as needed
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../components/EditTask", () => ({
  default: ({ task, onClose, onSaveChanges }) => (
    <div data-testid="edit-task-modal">
      Mock EditTask Modal
      <button onClick={() => onClose()}>Close Edit</button>
    </div>
  ),
}));

describe("TaskDetailsModal", () => {
  const mockTask = {
    id: 1,
    taskName: "Finish homework",
    isUrgent: true,
    isImportant: true,
    completed: false,
    selectedDate: "2025-04-10",
    taskDescription: "Finish math and science homework.",
  };

  const onClose = vi.fn();
  const onCompleteTask = vi.fn();
  const onDeleteTask = vi.fn();
  const onUpdateTask = vi.fn();
  const showNotification = vi.fn();

  const renderModal = () => {
    render(
      <TaskDetailsModal
        task={mockTask}
        onClose={onClose}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        showNotification={showNotification}
      />
    );
  };

  it("renders task details", () => {
    renderModal();
    expect(screen.getByText("Finish homework")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
    expect(screen.getByText("Important")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText(/Finish math and science homework/)).toBeInTheDocument();
  });

  it("calls onCompleteTask when checkbox is clicked", () => {
    renderModal();
    const checkbox = screen.getByTestId("modal-complete-checkbox");
    fireEvent.click(checkbox);
    expect(onCompleteTask).toHaveBeenCalledWith(expect.objectContaining({ completed: true }));
  });

  it("calls onDeleteTask and showNotification when Delete Task is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("Delete Task"));
    expect(onDeleteTask).toHaveBeenCalledWith(mockTask);
    expect(showNotification).toHaveBeenCalled();
  });

  it("opens and closes the EditTask modal", () => {
    renderModal();
    fireEvent.click(screen.getByText("Edit Task"));
    expect(screen.getByTestId("edit-task-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close Edit"));
    expect(screen.queryByTestId("edit-task-modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByText("✖"));
    expect(onClose).toHaveBeenCalled();
  });
});
