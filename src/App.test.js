import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /The easiest way to choose the right website colors/i
  );
  expect(linkElement).toBeInTheDocument();
});
