import styles from "../styles/Calculator.module.scss";

import { CalculatorState } from "../types";
import { getDisplayNumber } from "../utils";

type Props = {
    accumulator: number;
    operand: number;
    state: CalculatorState;
}

export function Display({ accumulator, operand, state }: Props) {
    const number = state === CalculatorState.OPERAND ? operand : accumulator;

    return (
        <div className={styles.Display} aria-live="polite">{
            state === CalculatorState.ERROR ? "ERROR" : getDisplayNumber(number)
        }</div>
    )
}
