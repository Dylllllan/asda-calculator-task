import { CalculatorState } from "../types";
import styles from "../styles/Calculator.module.scss";
import { getDisplayNumber } from "../utils";

type Props = {
    accumulator: number;
    operand: number | null;
    state: CalculatorState;
}

export function Display({ accumulator, operand, state }: Props) {
    const number = state === CalculatorState.OPERAND && operand != null ? operand : accumulator;

    return (
        <div className={styles.Display} aria-live="polite">{
            state === CalculatorState.ERROR ? "ERROR" : getDisplayNumber(number)
        }</div>
    )
}
