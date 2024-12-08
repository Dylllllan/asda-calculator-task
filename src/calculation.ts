import { Operation, Operator, Precedence } from "./types";

const operatorPrecedence: Record<Operator, Precedence> = {
    [Operator.NONE]: Precedence.LOW,
    [Operator.ADDITION]: Precedence.LOW,
    [Operator.SUBTRACTION]: Precedence.LOW,
    [Operator.MULTIPLICATION]: Precedence.HIGH,
    [Operator.DIVISION]: Precedence.HIGH
};

export function getIntermediateResult(operations: Operation[], operator: Operator): number {
    if (operations.length === 0) {
        return 0;
    }

    switch (operatorPrecedence[operator]) {
        case Precedence.LOW:
            return executeOperations(operations);
        case Precedence.HIGH:
            const intermediateOperations = getLastHighPrecedenceOperations(operations);
            if (intermediateOperations.length === 0) {
                // If there are no high precedence operations, return the number from the last operation
                return operations[operations.length - 1].number;
            }

            // Otherwise, execute the high precedence operations
            return executeOperationsInSequence(intermediateOperations);
    }
}

export function executeOperations(operationsArray: Operation[]): number {
    if (operationsArray.length === 0) {
        return 0;
    }

    const operations: Operation[] = [];
    const highPrecedenceOperations: Operation[] = [];

    // Helper function to execute high precedence operations
    function executeHighPrecedenceOperations() {
        if (highPrecedenceOperations.length > 0) {
            // Pop the last low precedence operation
            const lastOperation = operations.pop()!;
            const operationSequence = [lastOperation, ...highPrecedenceOperations];

            const result = executeOperationsInSequence(operationSequence);

            // Add the result of the high precedence operations with the last low precedence operator
            operations.push({ number: result, operator: lastOperation.operator });

            // Clear the high precedence operations
            highPrecedenceOperations.length = 0;
        }
    }

    // First, execute the sections of high precedence operations
    for (let i = 0; i < operationsArray.length; i++) {
        const operation = operationsArray[i];
        const operator = operation.operator;

        switch (operatorPrecedence[operator]) {
            case Precedence.HIGH:
                highPrecedenceOperations.push(operation);
                break;
            case Precedence.LOW:
                executeHighPrecedenceOperations();
                operations.push(operation);
                break;
        }
    }

    executeHighPrecedenceOperations();

    // Then, execute the remaining low precedence operations
    return executeOperationsInSequence(operations);
}

function executeOperationsInSequence(operations: Operation[]): number {
    if (operations.length === 0) {
        return 0;
    }

    // Start with the first number (even if it has an operator)
    let accumulator = operations[0].number;

    // Iterate through the rest of the operations
    for (let i = 1; i < operations.length; i++) {
        const operation = operations[i];

        accumulator = executeOperation(accumulator, operation.operator, operation.number);
    }

    return accumulator;
}

function getLastHighPrecedenceOperations(operations: Operation[]): Operation[] {
    if (operations.length === 0) {
        return [];
    }

    const lastOperationOperator = operations[operations.length - 1].operator;

    // If the last operation has a high precedence operator...
    if (operatorPrecedence[lastOperationOperator] === Precedence.HIGH) {
        // Work backwards to find the first operation with a low precedence operator, and return all operations starting there
        for (let i = operations.length - 1; i >= 0; i--) {
            const operator = operations[i].operator;

            if (operatorPrecedence[operator] === Precedence.LOW) {
                return operations.slice(i);
            }
        }
    }

    // Otherwise, return no operations
    return [];
}

function executeOperation(accumulator: number, operator: Operator, operand: number): number {
    switch (operator) {
        case Operator.ADDITION:
            return accumulator + operand;
        case Operator.SUBTRACTION:
            return accumulator - operand;
        case Operator.MULTIPLICATION:
            return accumulator * operand;
        case Operator.DIVISION:
            // Integer division
            return Math.floor(accumulator / operand);
        case Operator.NONE:
            return operand;
    }
}
