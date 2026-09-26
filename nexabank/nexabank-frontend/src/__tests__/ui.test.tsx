import { describe, expect, it } from "vitest";
import { mockTransactions } from "../api/mock";

describe("NexaBank frontend", () => {
  it("has mock transaction data", () => {
    expect(mockTransactions.length).toBeGreaterThan(0);
  });

  it("contains valid transaction amounts", () => {
    expect(mockTransactions.every(t => Number.isFinite(t.amount))).toBe(true);
  });
});