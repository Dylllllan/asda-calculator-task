import { useState } from "react";
import styles from "../styles/Calculator.module.scss";

import { Display } from "./Display";
import { DigitButton } from "./DigitButton";
import { OperatorButton } from "./OperatorButton";
import { Button } from "./Button";

import { CalculatorState, Operator } from "../types";
import { executeOperation } from "../calculation";
import { addDigit } from "../utils";

export function Calculator() {
    const [state, setState] = useState<CalculatorState>(CalculatorState.ACCUMULATOR);

    const [accumulator, setAccumulator] = useState<number>(0);

    const [operator, setOperator] = useState<Operator>(Operator.NONE);
    const [operand, setOperand] = useState<number>(0);

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
                setOperand(operand => addDigit(operand, digit));
                break;
            case CalculatorState.RESULT:
                setState(CalculatorState.ACCUMULATOR);
                setAccumulator(digit);
                break;
        }
    }

    const onOperatorInput = (op: Operator) => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.RESULT:
                setOperand(accumulator);
                break;
            case CalculatorState.OPERAND:
                const result = onExecute();
                if (!result) {
                    return;
                }
                // Set the operand to the result
                setOperand(result);
                break;
            case CalculatorState.ERROR:
                // Do nothing
                return;
        }

        setOperator(op);
        setState(CalculatorState.OPERATOR);
    }

    const onExecute = () => {
        if (operator === Operator.NONE) {
            return null;
        }

        try {
            const result = executeOperation(accumulator, operator, operand);
            setAccumulator(result);
            setState(CalculatorState.RESULT);

            return result;
        } catch {
            setState(CalculatorState.ERROR);
            return null;
        }
    }

    const onClearEntry = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.OPERATOR:
            case CalculatorState.RESULT:
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
        setOperator(Operator.NONE);
        setOperand(0);
        setState(CalculatorState.ACCUMULATOR);
    }

    const onToggleSign = () => {
        switch (state) {
            case CalculatorState.ACCUMULATOR:
            case CalculatorState.OPERATOR:
            case CalculatorState.RESULT:
                setAccumulator(accumulator => -accumulator);
                setState(CalculatorState.ACCUMULATOR);
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