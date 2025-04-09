import { render, screen } from "@testing-library/react";
import AddProject from "../components/AddProject";
import { TaskProvider } from "../context/TaskContext"; // ✅ Import your provider
import { vi } from "vitest";

test("disables Add Task button when task name is empty", () => {
  render(
    <TaskProvider>
      <AddProject
        isVisible={true}
        closePopUp={vi.fn()}
        setTasks={vi.fn()}
        showNotification={vi.fn()}
      />
    </TaskProvider>
  );

  const addButton = screen.getByRole("button", { name: /Add Task/i });
  expect(addButton).toBeDisabled();
});
