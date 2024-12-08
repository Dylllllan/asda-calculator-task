import { CalculatorState } from "../const";
import styles from "../styles/Calculator.module.scss";

type Props = {
    accumulator: number;
    operand: number | null;
    state: CalculatorState;
}

export function Display({ accumulator, operand, state }: Props) {
    return (
        <div className={styles.Display} aria-live="polite">{
            state === CalculatorState.ERROR ? "ERROR" :
            state === CalculatorState.OPERAND ? operand :
            accumulator
        }</div>
    )
}
