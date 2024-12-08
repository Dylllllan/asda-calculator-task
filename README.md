# ASDA Calculator Task

## Running the project

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to start the development server
4. Open `http://localhost:3000` in your browser
5. Run `npm test` to run the test suite

## Assumptions

- Assumes that, since the calculator only supports integer arithmetic, division should be [truncated](https://stackoverflow.com/a/19519244) to an integer.
- Assumes that the behaviour of the calculator app should be similar to the iPhone calculator app, except for operator precedence.

## Limitations

- The calculator app does not support operator precedence. When the next operator is pressed, the previous operation is executed and the result is displayed.
    - This causes issues when chaining operations together where the precedence of operators matters. For example, `1 + 2 * 3` results in `9` instead of `7`.
    - An implementation overcoming this limitation was explored, but was not ultimately delivered given its complexity and risks of breaking existing functionality. This may have been easier to deliver with confidence if a test-driven development approach was taken.
- The calculator app does not support keyboard input.
- Unit and component tests were written after the implementation of the calculator app, rather than taking a test-driven development approach.
