import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ResumePage from "./page";

it("renders the header, every section and the PDF download", () => {
  render(<ResumePage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("DILLON ROSE");
  for (const title of [
    "Summary",
    "Technical Skills",
    "Soft Skills",
    "Interests",
    "Experience",
    "Achievements",
    "Education",
  ]) {
    expect(screen.getByText(title)).toBeTruthy();
  }
  expect(screen.getByText("Principal Software Engineer")).toBeTruthy();
  expect(screen.getByText("Copilot for All")).toBeTruthy();
  expect(screen.getByRole("link", { name: /Download PDF/ }).getAttribute("href")).toBe("/resume.pdf");
});
