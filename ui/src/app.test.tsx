import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./app";

test("has a link to a dashboard on the index route", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
