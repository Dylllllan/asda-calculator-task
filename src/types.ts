export enum Operator {
    NONE = '',
    ADDITION = '+',
    SUBTRACTION = '-',
    MULTIPLICATION = '*',
    DIVISION = '/',
};

export enum CalculatorState {
    ACCUMULATOR,
    OPERATOR,
    OPERAND,
    RESULT,
    ERROR
};
