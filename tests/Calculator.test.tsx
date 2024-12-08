/**
 * @vitest-environment jsdom
 */

import React from "react";

import { expect, test, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import { Calculator } from "../src/components/Calculator";

beforeEach(() => {
    render(<Calculator />);
    return () => cleanup();
});

test("renders the calculator", () => {
    // Check the display is present and shows 0
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });
    expect(display).toBeTruthy();

    // Check all digit buttons are present
    for (let i = 0; i < 10; i++) {
        const button = screen.getByText(i.toString(), { selector: "button" });
        expect(button).toBeTruthy();
    }

    // Check all operator buttons are present
    const operatorButtons = ["+", "-", "×", "÷", "=", "CE", "C", "±"];
    for (const op of operatorButtons) {
        const button = screen.getByText(op, { selector: "button" });
        expect(button).toBeTruthy();
    }
});

test("basic addition", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");
});

test("basic subtraction", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, -, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows -1
    expect(display.textContent).toBe("-1");
});

test("basic multiplication", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 2, ×, 3, =
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("×"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 6
    expect(display.textContent).toBe("6");
});

test("basic division", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 6, ÷, 2, =
    fireEvent.click(screen.getByText("6"));
    fireEvent.click(screen.getByText("÷"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");
});

test("clear entry in accumulator state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, CE
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("CE"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");
});

test("clear entry in operator state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, CE
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("CE"));

    // Check the display shows 0 (reset to empty accumulator state)
    expect(display.textContent).toBe("0");
});

test("clear entry in operand state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, CE
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("CE"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");

    // Click 3, =
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 4
    expect(display.textContent).toBe("4");
});

test("clear entry in result state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click CE
    fireEvent.click(screen.getByText("CE"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");
});

test("error on division by zero", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, ÷, 0, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("÷"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows "ERROR"
    expect(display.textContent).toBe("ERROR");

    // Check that no other operations can be performed
    fireEvent.click(screen.getByText("1"));
    expect(display.textContent).toBe("ERROR");

    fireEvent.click(screen.getByText("+"));
    expect(display.textContent).toBe("ERROR");

    fireEvent.click(screen.getByText("="));
    expect(display.textContent).toBe("ERROR");

    fireEvent.click(screen.getByText("CE"));
    expect(display.textContent).toBe("ERROR");

    // Check that the error is cleared after a clear and a new operation can be performed
    fireEvent.click(screen.getByText("C"));
    expect(display.textContent).toBe("0");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    expect(display.textContent).toBe("3");
});

test("intermediate result shows when operator is clicked", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));

    // Click -
    fireEvent.click(screen.getByText("-"));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click 4
    fireEvent.click(screen.getByText("4"));

    // Check the display shows 4
    expect(display.textContent).toBe("4");

    // Click *
    fireEvent.click(screen.getByText("×"));

    // Check the display shows -1
    expect(display.textContent).toBe("-1");

    // Click 5
    fireEvent.click(screen.getByText("5"));

    // Click /
    fireEvent.click(screen.getByText("÷"));

    // Check the display shows -5
    expect(display.textContent).toBe("-5");
});

test("toggle sign in accumulator state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -0
    expect(display.textContent).toBe("-0");

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");

    // Click 1, ±
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -1
    expect(display.textContent).toBe("-1");

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows 1
    expect(display.textContent).toBe("1");
});

test("toggle sign in operator state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -1 (falls back to accumulator state)
    expect(display.textContent).toBe("-1");

    // Click 2
    fireEvent.click(screen.getByText("2"));

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows 12
    expect(display.textContent).toBe("12");
});

test("toggle sign in operand state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -2
    expect(display.textContent).toBe("-2");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows -1
    expect(display.textContent).toBe("-1");
});

test("toggle sign in result state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -3
    expect(display.textContent).toBe("-3");

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows 3
    expect(display.textContent).toBe("3");
});

test("cannot add more digits in result state", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click 4
    fireEvent.click(screen.getByText("4"));

    // Check the display shows 4
    expect(display.textContent).toBe("4");
});

test("cannot add more digits in result state after toggling sign", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click ±
    fireEvent.click(screen.getByText("±"));

    // Check the display shows -3
    expect(display.textContent).toBe("-3");

    // Click 4
    fireEvent.click(screen.getByText("4"));

    // Check the display shows 4
    expect(display.textContent).toBe("4");
});

test("the last operation is repeated when the equals button is clicked", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 5
    expect(display.textContent).toBe("5");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 7
    expect(display.textContent).toBe("7");
});

test("the last operation is remembered after clear entry", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click CE
    fireEvent.click(screen.getByText("CE"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 2
    expect(display.textContent).toBe("2");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 4
    expect(display.textContent).toBe("4");
});

test("the last operation is cleared after clear", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click C
    fireEvent.click(screen.getByText("C"));

    // Check the display shows 0
    expect(display.textContent).toBe("0");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 0
    expect(display.textContent).toBe("0");
});

test("the intermediate result is used as the operand when equals is clicked after an operator", () => {
    const display = screen.getByText("0", { selector: '[aria-live="polite"]' });

    // Click 1, +, 2, =
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));

    // Click +
    fireEvent.click(screen.getByText("+"));

    // Check the display shows 3
    expect(display.textContent).toBe("3");

    // Click =
    fireEvent.click(screen.getByText("="));

    // Check the display shows 6
    expect(display.textContent).toBe("6");
});
