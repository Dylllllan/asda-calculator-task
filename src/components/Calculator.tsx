import { Display } from "./Display";

import styles from "../styles/Calculator.module.scss";
import { DigitButton } from "./DigitButton";
import { OperatorButton } from "./OperatorButton";
import { useState } from "react";
import { CalculatorState, Operation, Operator } from "../types";
import { addDigit } from "../utils";
import { Button } from "./Button";
import { executeOperations, getIntermediateResult } from "../calculation";

export function Calculator() {
    const [state, setState] = useState<CalculatorState>(CalculatorState.ACCUMULATOR);

    const [accumulator, setAccumulator] = useState<number>(0);

    const [operator, setOperator] = useState<Operator>(Operator.NONE);
    const [operand, setOperand] = useState<number>(0);

    const [operations, setOperations] = useState<Operation[]>([]);

    const onDigitInput = (digit: number) => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
                setAccumulator(accumulator => addDigit(accumulator, digit));
                break;
            case CalculatorState.OPERATOR:
                setOperand(digit);
                setState(CalculatorState.OPERAND);
                break;
            case CalculatorState.OPERAND:
                setOperand(operand => addDigit(operand, digit));
                break;
            case CalculatorState.RESULT:
                setAccumulator(digit);
                setOperations([]);
                setState(CalculatorState.ACCUMULATOR);
                break;
        }
    }

    const onOperatorInput = (op: Operator) => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
                setOperations(operations => [...operations, { number: accumulator, operator: Operator.NONE }]);
                break;
            case CalculatorState.OPERATOR:
                setOperator(op);
                break;
            case CalculatorState.OPERAND:
                if (operator === Operator.DIVISION && operand === 0) {
                    setState(CalculatorState.ERROR);
                    return;
                }

                setOperations(operations => [...operations, { number: operand, operator: operator }]);
                break;
            case CalculatorState.RESULT:
                // The result is already in the operations array
        }

        setOperator(op);
        setState(CalculatorState.OPERATOR);
    }

    const onExecute = () => {
        // Use the intermediate result as the operand if operator is pressed before executing
        const number = state === CalculatorState.OPERATOR ? getIntermediateResult(operations, operator) : operand;
        setOperand(number);

        const result = executeOperations([...operations, { number, operator }]);

        setAccumulator(result);
        setOperations([{ number: result, operator: Operator.NONE }]);
        setState(CalculatorState.RESULT);
    }

    const onClearEntry = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
                setAccumulator(0);
                break;
            case CalculatorState.OPERATOR:
                setState(operations.length > 1 ? CalculatorState.OPERAND : CalculatorState.ACCUMULATOR);

                // Remove the last operation added
                if (operations.length > 0) {
                    const lastOperation = operations[operations.length - 1];
                    setOperations(operations => operations.slice(0, -1));

                    setOperator(lastOperation.operator);
                }
                break;
            case CalculatorState.OPERAND:
                setOperand(0);
                break;
            case CalculatorState.RESULT:
                setAccumulator(0);
                setState(CalculatorState.ACCUMULATOR);
                break;
        }
    }

    const onClear = () => {
        setAccumulator(0);
        setOperator(Operator.NONE);
        setOperand(0);
        setState(CalculatorState.ACCUMULATOR);
        setOperations([]);
    }

    const onToggleSign = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
                setAccumulator(accumulator => -accumulator);
                break;
            case CalculatorState.OPERATOR:
                setState(CalculatorState.OPERAND);
                setOperand(0);
                break;
            case CalculatorState.OPERAND:
                setOperand(operand => -operand);
                break;
        }
    }

    const buildOperatorButton = (op: Operator) => {
        return <OperatorButton operator={op} onClick={() => onOperatorInput(op)}
            highlight={state == CalculatorState.OPERATOR && operator == op} />
    }
    const buildDigitButtons = (digits: number[]) => {
        return digits.map(digit => <DigitButton key={digit} value={digit} onClick={() => onDigitInput(digit)} />)
    }

    return (
        <div className={styles.Calculator}>
            <Display accumulator={accumulator} operand={operand} result={getIntermediateResult(operations, operator)} state={state} />
            <div className={styles.ButtonGrid}>
                <Button onClick={() => onClear()} accessibilityLabel="Clear">C</Button>
                <Button onClick={() => onClearEntry()} accessibilityLabel="Clear entry">CE</Button>
                <Button onClick={() => onToggleSign()} accessibilityLabel="Toggle sign">±</Button>
                {buildOperatorButton(Operator.DIVISION)}
                {buildDigitButtons([7, 8, 9])}
                {buildOperatorButton(Operator.MULTIPLICATION)}
                {buildDigitButtons([4, 5, 6])}
                {buildOperatorButton(Operator.SUBTRACTION)}
                {buildDigitButtons([1, 2, 3])}
                {buildOperatorButton(Operator.ADDITION)}
                <DigitButton value={0} onClick={() => onDigitInput(0)} columnSpan={3} />
                <Button onClick={() => onExecute()} accent accessibilityLabel="Equals">=</Button>
            </div>
        </div>
    )
}