# ASDA Calculator Task

## Running the project

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## Assumptions

- Assumes that, since the calculator only supports integer arithmetic, division should round down to the nearest integer.
- Assumes that the behaviour of the calculator app should be similar to the iPhone calculator app, except for operator precedence.

## Limitations

- The calculator app does not support operator precedence. When the next operator is pressed, the previous operation is executed and the result is displayed.
    - This causes issues when chaining operations together where the precedence of operators matters. For example, `1 + 2 * 3` results in `9` instead of `7`.
    - Overcoming this limitation has been explored in the `Operator-precedence` branch.
- The calculator app does not support keyboard input.
- There are no unit or integration tests for the calculator app.
