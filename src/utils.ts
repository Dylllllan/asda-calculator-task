export function addDigit(accumulator: number, digit: number): number {
    return accumulator * 10 + digit;
}

export function getDisplayNumber(number: number): string {
    // If greater than 10^11, use scientific notation to 10 significant figures
    if (Math.abs(number) >= 1e11) {
        return number.toExponential(10);
    }

    // Otherwise, add commas to separate thousands
    return number.toLocaleString();
}
