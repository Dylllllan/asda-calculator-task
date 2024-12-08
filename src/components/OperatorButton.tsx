import styles from "../styles/Calculator.module.scss";

type Props = {
    value: string;
    onClick: () => void;
    columnSpan?: number;
    accent?: boolean;
}

export function OperatorButton({ value, onClick, columnSpan = 1, accent = false }: Props) {
    return (
        <button
            className={accent ? styles.AccentButton : styles.Button}
            onClick={onClick}
            style={{ gridColumn: `span ${columnSpan}` }}
        >
            {value}
        </button>
    )
}