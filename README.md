# About The Project
As an optional task for my app development university class I consoldiated all of the individual exercises into one single page application.
This SPA includes the following exercises viewable via the app navigation bar:
- Quote Generator
- Markdown Previewer
- Drum Machine
- Calculator
- Timer

# Built With

This project was bootstrapped with:
- [Create React App](https://github.com/facebook/create-react-app)
- [Bootstrap 5](https://github.com/twbs/bootstrap)
- [React Rooter](https://github.com/remix-run/react-router)
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
- [Dom Purify](https://github.com/cure53/DOMPurify)
- [Marked](https://github.com/markedjs/marked)

# Available Scripts

## Starting The App
In the project directory of the IDE or the command line, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `Quote Generator`

The script fetches the quote (based on selected category) via the API-Ninja API and renders it upon completed GET request.

### `Markdown Previewer`

The entered Markdown document is first translated to html with marked library, then checked for XSS with DOM Purify library and finally rendered as html. 

### `Drum Machine`

Plays various sound via button or key press with possibility to change volume, record the sounds and play the latest recording. Recordings are not saved.

### `Calculator`

Executes basic mathematical operations with rational numbers.

### `Timer`

Tracks the selected time and informs the user with alarm once the time is up. Once started, timer toggles between active and break mode automatically.