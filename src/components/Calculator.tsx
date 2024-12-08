import { Display } from "./Display";

import styles from "../styles/Calculator.module.scss";
import { DigitButton } from "./DigitButton";
import { OperatorButton } from "./OperatorButton";

export function Calculator() {
    return (
        <div className={styles.Calculator}>
            <Display value={0} />
            <div className={styles.ButtonGrid}>
                <OperatorButton value="C" onClick={() => {}} />
                <OperatorButton value="CE" onClick={() => {}} />
                <OperatorButton value="±" onClick={() => {}} />
                <OperatorButton value="÷" onClick={() => {}} accent />
                <DigitButton value={7} onClick={() => {}} />
                <DigitButton value={8} onClick={() => {}} />
                <DigitButton value={9} onClick={() => {}} />
                <OperatorButton value="×" onClick={() => {}} accent />
                <DigitButton value={4} onClick={() => {}} />
                <DigitButton value={5} onClick={() => {}} />
                <DigitButton value={6} onClick={() => {}} />
                <OperatorButton value="-" onClick={() => {}} accent />
                <DigitButton value={1} onClick={() => {}} />
                <DigitButton value={2} onClick={() => {}} />
                <DigitButton value={3} onClick={() => {}} />
                <OperatorButton value="+" onClick={() => {}} accent />
                <DigitButton value={0} onClick={() => {}} columnSpan={3} />
                <OperatorButton value="=" onClick={() => {}} accent />
            </div>
        </div>
    )
}