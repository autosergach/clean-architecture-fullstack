import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders foundation message", () => {
    render(<App />);
    expect(screen.getByText(/Frontend foundation is ready/i)).toBeInTheDocument();
  });
});
