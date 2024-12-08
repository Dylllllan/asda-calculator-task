import { describe, expect, test } from "vitest";

import { Operator } from "../src/types";
import { executeOperation } from "../src/calculation";

describe("executeOperation", () => {
    test("addition to positive numbers", () => {
        expect(executeOperation(1, Operator.ADDITION, 2)).toBe(3);
        expect(executeOperation(1, Operator.ADDITION, -2)).toBe(-1);
        expect(executeOperation(1, Operator.ADDITION, 0)).toBe(1);
    });

    test("subtraction from positive numbers", () => {
        expect(executeOperation(1, Operator.SUBTRACTION, 2)).toBe(-1);
        expect(executeOperation(1, Operator.SUBTRACTION, -2)).toBe(3);
        expect(executeOperation(1, Operator.SUBTRACTION, 0)).toBe(1);
    });

    test("multiplication of positive numbers", () => {
        expect(executeOperation(1, Operator.MULTIPLICATION, 2)).toBe(2);
        expect(executeOperation(1, Operator.MULTIPLICATION, -2)).toBe(-2);
        expect(executeOperation(1, Operator.MULTIPLICATION, 0)).toBe(0);
    });

    test("integer division of positive numbers", () => {
        expect(executeOperation(1, Operator.DIVISION, 2)).toBe(0);
        expect(executeOperation(1, Operator.DIVISION, -2)).toBe(-0); // Result is truncated towards zero

        expect(executeOperation(25, Operator.DIVISION, 5)).toBe(5);
        expect(executeOperation(25, Operator.DIVISION, -5)).toBe(-5);

        expect(executeOperation(25, Operator.DIVISION, 4)).toBe(6);
        expect(executeOperation(25, Operator.DIVISION, -4)).toBe(-6);

        expect(executeOperation(1, Operator.DIVISION, 1)).toBe(1);
    });

    test("addition to negative numbers", () => {
        expect(executeOperation(-1, Operator.ADDITION, 2)).toBe(1);
        expect(executeOperation(-1, Operator.ADDITION, -2)).toBe(-3);
        expect(executeOperation(-1, Operator.ADDITION, 0)).toBe(-1);
    });

    test("subtraction from negative numbers", () => {
        expect(executeOperation(-1, Operator.SUBTRACTION, 2)).toBe(-3);
        expect(executeOperation(-1, Operator.SUBTRACTION, -2)).toBe(1);
        expect(executeOperation(-1, Operator.SUBTRACTION, 0)).toBe(-1);
    });

    test("multiplication of negative numbers", () => {
        expect(executeOperation(-1, Operator.MULTIPLICATION, 2)).toBe(-2);
        expect(executeOperation(-1, Operator.MULTIPLICATION, -2)).toBe(2);
        expect(executeOperation(-1, Operator.MULTIPLICATION, 0)).toBe(-0);
    });

    test("integer division of negative numbers", () => {
        expect(executeOperation(-1, Operator.DIVISION, 2)).toBe(-0); // Result is truncated towards zero
        expect(executeOperation(-1, Operator.DIVISION, -2)).toBe(0); // Result is truncated towards zero

        expect(executeOperation(-25, Operator.DIVISION, 5)).toBe(-5);
        expect(executeOperation(-25, Operator.DIVISION, -5)).toBe(5);

        expect(executeOperation(-25, Operator.DIVISION, 4)).toBe(-6);
        expect(executeOperation(-25, Operator.DIVISION, -4)).toBe(6);

        expect(executeOperation(-1, Operator.DIVISION, 1)).toBe(-1);
    });
});