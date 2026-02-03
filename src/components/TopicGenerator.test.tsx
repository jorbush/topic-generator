import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TopicGenerator from "./TopicGenerator";

// Mock the store
vi.mock("../store/topicStore", () => ({
  generateRandomTopic: vi.fn(() => ({ topic: "Test Topic" })),
}));

describe("TopicGenerator", () => {
  it("renders initial state correctly", () => {
    render(<TopicGenerator />);
    expect(screen.getByText("WAITING FOR INPUT...")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /generate topic/i }),
    ).toBeInTheDocument();
  });

  it("generates a topic when button is clicked", async () => {
    render(<TopicGenerator />);

    const button = screen.getByRole("button", { name: /generate topic/i });
    fireEvent.click(button);

    // wait for typing animation to start/finish - implementation detail: it types out
    // checking for presence of part of the topic
    expect(await screen.findByText("T")).toBeInTheDocument();
  });
});
