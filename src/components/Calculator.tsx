import { Display } from "./Display";

import styles from "../styles/Calculator.module.scss";
import { DigitButton } from "./DigitButton";
import { OperatorButton } from "./OperatorButton";
import { useState } from "react";
import { CalculatorState, Operator } from "../const";
import { addDigit, executeOperation } from "../utils";
import { Button } from "./Button";

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
                break;
            case CalculatorState.OPERAND:
                // Execute and clear the current operation
                onExecute(true);
                setOperator(op);
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

    return (
        <div className={styles.Calculator}>
            <Display accumulator={accumulator} operand={operand} state={state} />
            <div className={styles.ButtonGrid}>
                <Button onClick={() => onClear()}>C</Button>
                <Button onClick={() => onClearEntry()}>CE</Button>
                <Button onClick={() => onToggleSign()}>±</Button>
                <OperatorButton operator={Operator.DIVISION} onClick={() => onOperatorInput(Operator.DIVISION)} />
                <DigitButton value={7} onClick={() => onDigitInput(7)} />
                <DigitButton value={8} onClick={() => onDigitInput(8)} />
                <DigitButton value={9} onClick={() => onDigitInput(9)} />
                <OperatorButton operator={Operator.MULTIPLICATION} onClick={() => onOperatorInput(Operator.MULTIPLICATION)} />
                <DigitButton value={4} onClick={() => onDigitInput(4)} />
                <DigitButton value={5} onClick={() => onDigitInput(5)} />
                <DigitButton value={6} onClick={() => onDigitInput(6)} />
                <OperatorButton operator={Operator.SUBTRACTION} onClick={() => onOperatorInput(Operator.SUBTRACTION)} />
                <DigitButton value={1} onClick={() => onDigitInput(1)} />
                <DigitButton value={2} onClick={() => onDigitInput(2)} />
                <DigitButton value={3} onClick={() => onDigitInput(3)} />
                <OperatorButton operator={Operator.ADDITION} onClick={() => onOperatorInput(Operator.ADDITION)} />
                <DigitButton value={0} onClick={() => onDigitInput(0)} columnSpan={3} />
                <Button onClick={() => onExecute()}>=</Button>
            </div>
        </div>
    )
}