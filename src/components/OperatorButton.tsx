import { Operator } from "../const";
import { Button } from "./Button";

type Props = {
    operator: Operator;
    onClick: () => void;
    columnSpan?: number;
}

const operatorSymbols: Record<Operator, string> = {
    [Operator.ADDITION]: "+",
    [Operator.SUBTRACTION]: "-",
    [Operator.MULTIPLICATION]: "×",
    [Operator.DIVISION]: "÷"
}

export function OperatorButton({ operator, onClick, columnSpan = 1 }: Props) {
    return (
        <Button onClick={onClick} columnSpan={columnSpan} accent>
            {operatorSymbols[operator]}
        </Button>
    )
}