# ASDA Calculator Task

## Running the project

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## Assumptions

- Assumes that, since the calculator only supports integer arithmetic, division should be [truncated](https://stackoverflow.com/a/19519244) to the nearest integer.
- Assumes that the behaviour of the calculator app should be similar to the iPhone calculator app, except for operator precedence.

## Limitations

- The calculator app does not support operator precedence. When the next operator is pressed, the previous operation is executed and the result is displayed.
    - This causes issues when chaining operations together where the precedence of operators matters. For example, `1 + 2 * 3` results in `9` instead of `7`.
    - Overcoming this limitation was explored, but was not implemented to avoid bloating the solution with complex logic.
- The calculator app does not support keyboard input.
- Unit and component tests were written after the implementation of the calculator app, rather than taking a test-driven development approach.
