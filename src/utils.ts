import { Operator } from "./const";

export function addDigit(accumulator: number, digit: number): number {
    return accumulator * 10 + digit;
}

export function executeOperation(accumulator: number, operator: Operator, operand: number): number {
    switch (operator) {
        case Operator.ADDITION:
            return accumulator + operand;
        case Operator.SUBTRACTION:
            return accumulator - operand;
        case Operator.MULTIPLICATION:
            return accumulator * operand;
        case Operator.DIVISION:
            if (operand === 0) {
                throw new Error("Division by zero");
            }
            // Integer division
            return Math.floor(accumulator / operand);
    }
}

export function getDisplayNumber(number: number): string {
    // If greater than 10^11, use scientific notation to 10 significant figures
    if (Math.abs(number) >= 1e11) {
        return number.toExponential(10);
    }

    // Otherwise, add commas to separate thousands
    return number.toLocaleString();
}
