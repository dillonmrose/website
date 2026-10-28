import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ResumePage from "./page";

it("renders the header, every section and the PDF download", () => {
  render(<ResumePage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("DILLON ROSE");
  for (const title of ["Summary", "Technical Skills", "Leadership", "Interests", "Experience", "Education"]) {
    expect(screen.getByText(title)).toBeTruthy();
  }
  expect(screen.getByText("Principal Software Engineer")).toBeTruthy();
  expect(screen.getByText("Microsoft Copilot")).toBeTruthy();
  expect(screen.getByRole("link", { name: /Download PDF/ }).getAttribute("href")).toBe("/resume.pdf");
});
