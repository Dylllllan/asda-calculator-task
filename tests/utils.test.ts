import { expect, test } from "vitest";
import { addDigit, getDisplayNumber } from "../src/utils";

test("add digit to 0 becomes digit", () => {
    expect(addDigit(0, 1)).toBe(1);
    expect(addDigit(0, 2)).toBe(2);
});

test("add digit to 1 becomes 10 + digit", () => {
    expect(addDigit(1, 2)).toBe(12);
    expect(addDigit(1, 3)).toBe(13);
});

test("add digit to number ending in 0 becomes 10 * number + digit", () => {
    expect(addDigit(10, 3)).toBe(103);
    expect(addDigit(20, 4)).toBe(204);
});

test("add digit to negative number", () => {
    expect(addDigit(-1, 2)).toBe(-12);
    expect(addDigit(-10, 3)).toBe(-103);
});

test("get display number for 0", () => {
    expect(getDisplayNumber(0)).toBe("0");
});

test("get display number for positive number", () => {
    expect(getDisplayNumber(1234)).toBe("1,234");
});

test("get display number for negative number", () => {
    expect(getDisplayNumber(-1234)).toBe("-1,234");
});

test("get display number for large numbers in scientific form", () => {
    expect(getDisplayNumber(1e11 - 1)).toBe("99,999,999,999");
    expect(getDisplayNumber(1e11)).toBe("1.0000000000e+11");
    expect(getDisplayNumber(-1e11)).toBe("-1.0000000000e+11");
});

test("get display number for large numbers where scientific form loses precision", () => {
    expect(getDisplayNumber(2339825344308632)).toBe("2.3398253443e+15");
    expect(getDisplayNumber(-2339825344308632)).toBe("-2.3398253443e+15");
    expect(getDisplayNumber(2339825344358632)).toBe("2.3398253444e+15");
    expect(getDisplayNumber(-2339825344358632)).toBe("-2.3398253444e+15");
});
