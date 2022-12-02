# 2048 in React + Typescript

This is a React + Typescript version of the game 2048. You can play the game here: https://nathanqueija.github.io/2048/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## The current status and what comes next

- I decided to focus on the core logic of the game instead of the visuals. As a result, you'll notice that much more care is poured onto the functions that operate on the board.

- My approach to performing board operations is following the functional paradigm as much as possible. None of the operations mutates the board in place. I tried to be as close to the data as I could without adding any abstraction layers on top of it.

- Core logic is not fully covered with tests, but most are. So I decided to focus on testing the critical parts of the board operations.

- Next steps will be to add integration tests and UI tests to resemble how the user would use the board.

- I plan to add game controls like restart, etc.
