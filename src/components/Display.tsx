import styles from "../styles/Calculator.module.scss";

type Props = {
    value: number;
    error?: boolean;
}

export function Display({ value, error = false }: Props) {
    return (
        <div className={styles.Display}>{error ? "ERROR" : value}</div>
    )
}
