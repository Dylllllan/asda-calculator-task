import styles from "../styles/Button.module.scss";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    accent?: boolean;
    columnSpan?: number;
}

export function Button({ onClick, children, accent = false, columnSpan = 1 }: Props) {
    return (
        <button
            className={accent ? styles.AccentButton : styles.Button}
            style={{ gridColumn: `span ${columnSpan}` }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
