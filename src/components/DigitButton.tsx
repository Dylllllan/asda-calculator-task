import styles from "../styles/Calculator.module.scss";

type Props = {
    value: number;
    onClick: () => void;
    columnSpan?: number;
}

export function DigitButton({ value, onClick, columnSpan = 1 }: Props) {
    return (
        <button className={styles.Button} onClick={onClick} style={{ gridColumn: `span ${columnSpan}` }}>
            {value}
        </button>
    )
}
