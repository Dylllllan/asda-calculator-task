import { Display } from "./Display";

import styles from "../styles/Calculator.module.scss";
import { DigitButton } from "./DigitButton";
import { OperatorButton } from "./OperatorButton";
import { useState } from "react";
import { CalculatorState, Operator } from "../types";
import { addDigit } from "../utils";
import { Button } from "./Button";
import { executeOperation } from "../calculation";

export function Calculator() {
    const [state, setState] = useState<CalculatorState>(CalculatorState.ACCUMULATOR);

    const [accumulator, setAccumulator] = useState<number>(0);

    const [operator, setOperator] = useState<Operator | null>(null);
    const [operand, setOperand] = useState<number | null>(null);

    const onDigitInput = (digit: number) => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
                setAccumulator(accumulator => addDigit(accumulator, digit));
                break;
            case CalculatorState.OPERATOR:
                setState(CalculatorState.OPERAND);
                setOperand(digit);
                break;
            case CalculatorState.OPERAND:
                setOperand(operand => operand ? addDigit(operand, digit) : digit);
                break;
        }
    }

    const onOperatorInput = (op: Operator) => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.OPERATOR:
                setOperator(op);
                setOperand(accumulator);
                break;
            case CalculatorState.OPERAND:
                // Execute and clear the current operation
                onExecute(true);

                setOperator(op);
                setOperand(accumulator);
                break;
        }

        setState(CalculatorState.OPERATOR);
    }

    const onExecute = (clearOperation = false) => {
        if (operator === null || operand === null) {
            return;
        }

        try {
            const result = executeOperation(accumulator, operator, operand);

            if (clearOperation) {
                setOperator(null);
                setOperand(null);
            }
    
            setAccumulator(result);
            setState(CalculatorState.ACCUMULATOR);
        } catch {
            setState(CalculatorState.ERROR);
        }
    }

    const onClearEntry = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.OPERATOR:
                setAccumulator(0);
                setState(CalculatorState.ACCUMULATOR);
                break;
            case CalculatorState.OPERAND:
                setOperand(0);
                break;
        }
    }

    const onClear = () => {
        setAccumulator(0);
        setOperator(null);
        setOperand(null);
        setState(CalculatorState.ACCUMULATOR);
    }

    const onToggleSign = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.OPERATOR:
                setAccumulator(accumulator => -accumulator);
                setState(CalculatorState.ACCUMULATOR);
                break;
            case CalculatorState.OPERAND:
                setOperand(operand => operand ? -operand : 0);
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
            <Display accumulator={accumulator} operand={operand} state={state} />
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