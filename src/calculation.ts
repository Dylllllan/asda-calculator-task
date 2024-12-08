import { Operator } from "./types";

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