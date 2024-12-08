import { Operator } from "../types";
import { Button } from "./Button";

type Props = {
    operator: Operator;
    onClick: () => void;
    highlight?: boolean;
}

const operatorSymbols: Record<Operator, string> = {
    [Operator.ADDITION]: "+",
    [Operator.SUBTRACTION]: "-",
    [Operator.MULTIPLICATION]: "×",
    [Operator.DIVISION]: "÷"
}

const operatorAccessibilityLabels: Record<Operator, string> = {
    [Operator.ADDITION]: "Add",
    [Operator.SUBTRACTION]: "Subtract",
    [Operator.MULTIPLICATION]: "Multiply",
    [Operator.DIVISION]: "Divide"
}

export function OperatorButton({ operator, onClick, highlight }: Props) {
    return (
        <Button onClick={onClick} accent highlight={highlight}
            accessibilityLabel={operatorAccessibilityLabels[operator]}>
            {operatorSymbols[operator]}
        </Button>
    )
}