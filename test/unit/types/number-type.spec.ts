import { describe, expect, it } from "vitest";

describe("Number type tests", () => {
  it("should add two numbers correctly", () => {
    const a = 2;
    const b = 3;
    expect(a + b).toBe(5);
  });

  it("should handle NaN values", () => {
    const value = Number("not a number");
    expect(isNaN(value)).toBe(true);
  });

  it("should parse integer strings", () => {
    const value = Number("42");
    expect(value).toBe(42);
  });

  it("should parse float strings", () => {
    const value = Number("3.14");
    expect(value).toBeCloseTo(3.14);
  });
});