import { describe, expect, it } from "vitest";
import { CredenciaisApiSchema } from "../../../src/api/credenciais-api";

describe("CredenciaisApiSchema", () => {
  it("should validate correct credentials", () => {
    const data = {
      usuario: "usuario123",
      senha: "senhaSegura",
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should fail if usuario is missing", () => {
    const data = {
      senha: "senhaSegura",
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if senha is missing", () => {
    const data = {
      usuario: "usuario123",
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if url is missing", () => {
    const data = {
      usuario: "usuario123",
      senha: "senhaSegura"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if url is not a valid URL", () => {
    const data = {
      usuario: "usuario123",
      senha: "senhaSegura",
      url: "not-a-valid-url"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if usuario is not a string", () => {
    const data = {
      usuario: 123,
      senha: "senhaSegura",
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("should fail if senha is not a string", () => {
    const data = {
      usuario: "usuario123",
      senha: 12345,
      url: "https://example.com"
    };
    const result = CredenciaisApiSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});