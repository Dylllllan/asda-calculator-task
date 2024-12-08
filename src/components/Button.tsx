import classNames from "classnames";
import styles from "../styles/Button.module.scss";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    accent?: boolean;
    highlight?: boolean;
    columnSpan?: number;
}

export function Button({ onClick, children, accent = false, highlight = false, columnSpan = 1 }: Props) {
    return (
        <button
            className={classNames(styles.Button, {
                [styles.Accent]: accent,
                [styles.AccentHighlight]: accent && highlight
            })}
            style={{ gridColumn: `span ${columnSpan}` }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
