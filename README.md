# ASDA Calculator Task

## Running the project

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## Assumptions

- The calculator is a simple four-function calculator with no memory or history.
- The calculator only supports integer arithmetic, so division rounds down to the nearest integer.
- The behaviour of the calculator app is similar to the iPhone calculator app, except that the result is displayed after each operation is executed.

## Limitations

- When the next operator is pressed, the previous operation is executed and the result is displayed. This causes issues when chaining operations together where the precedence of operators matters. For example, `1 + 2 * 3` results in `9` instead of `7`.
- The calculator app does not support keyboard input.
- The calculator app has no accessibility features.
