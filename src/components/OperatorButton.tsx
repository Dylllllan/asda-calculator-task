import { Operator } from "../const";
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

export function OperatorButton({ operator, onClick, highlight }: Props) {
    return (
        <Button onClick={onClick} accent highlight={highlight}>
            {operatorSymbols[operator]}
        </Button>
    )
}