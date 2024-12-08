import { CalculatorState } from "../types";
import styles from "../styles/Calculator.module.scss";
import { getDisplayNumber } from "../utils";

type Props = {
    accumulator: number;
    operand: number;
    result: number;
    state: CalculatorState;
}

export function Display({ accumulator, operand, result, state }: Props) {
    const number = state === CalculatorState.ACCUMULATOR ? accumulator :
                   state === CalculatorState.OPERAND ? operand : result;

    return (
        <div className={styles.Display} aria-live="polite">{
            state === CalculatorState.ERROR ? "ERROR" : getDisplayNumber(number)
        }</div>
    )
}
