export enum Operator {
    NONE = '',
    ADDITION = '+',
    SUBTRACTION = '-',
    MULTIPLICATION = '*',
    DIVISION = '/',
};

export enum Precedence {
    LOW = 1,
    HIGH = 2
}

export enum CalculatorState {
    ACCUMULATOR,
    OPERATOR,
    OPERAND,
    RESULT,
    ERROR
};

export interface Operation {
    number: number;
    operator: Operator;
}
