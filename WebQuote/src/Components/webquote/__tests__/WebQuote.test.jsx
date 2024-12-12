import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WebQuote from "../WebQuote";

describe("WebQuote", () => {
  it("renders without crashing", () => {
    render(<WebQuote />);
    expect(screen.getByText("WebQuote")).toBeInTheDocument();
  });

  it("displays correct number of testimonials", () => {
    render(<WebQuote />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("renders navigation links", () => {
    render(<WebQuote />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre nós")).toBeInTheDocument();
    expect(screen.getByText("Contactos")).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<WebQuote />);
    expect(
      screen.getByText("Clique aqui para o orçamento")
    ).toBeInTheDocument();
  });
});
