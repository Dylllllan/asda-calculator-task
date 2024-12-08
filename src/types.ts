export enum Operator {
    ADDITION = '+',
    SUBTRACTION = '-',
    MULTIPLICATION = '*',
    DIVISION = '/',
};

export enum CalculatorState {
    ACCUMULATOR,
    OPERATOR,
    OPERAND,
    ERROR
};

export interface Operation {
    number: number;
    operator?: Operator;
}
