import { Button } from "./Button";

type Props = {
    value: number;
    onClick: () => void;
    columnSpan?: number;
}

export function DigitButton({ value, onClick, columnSpan = 1 }: Props) {
    return (
        <Button onClick={onClick} columnSpan={columnSpan}>
            {value}
        </Button>
    )
}
