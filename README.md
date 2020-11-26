# Mundungus Fletcher game

## Tasks

### init app
- [x] redux -> list of GAMEs containing USERs & NAMEs
- [x] layout

### new user
- [x] When window opened, new user added
- [x] ask for username - only add user once username inputted

### main page
- [x] display username
- [x] display list of users
- [x] button to "start game"

### start game
- [x] on start button press, all users taken to NAME input
- [x] on NAME input, NAMEs added to store
- [x] "done" button when you have finished adding NAMEs
- [ ] list of users ready to play
- [ ] option to "start game"
- [ ] when all users are ready, game starts

### start round
- [ ] button to "start round"
- [ ] on button press 1 minute timer starts
- [ ] display a NAME, picked randomly from list
- [ ] "next" button -> on press, name is removed from list, new name shown
- [ ] time's up, button to ask if user got the final name (if they did, remove it from the list)

### game over
- [ ] game ends when all names have been guessed

### optional
- [ ] when a round is in play, noone else can press "start round"
- [ ] select the user you will read to 
- [ ] SCORE - add this to the GAME in the store
- [ ] when "next" button is pressed, add 1 point to current user & person guessing
- [ ] when round ends, if user got the final name, add 1 point to current user & person guessing
- [ ] store username in localStorage

## General set-up guide

### ENVIRONMENT

NodeJS running express for the backend with a React app for the frontend.

#### Basic Setup

- Follow instructions for installing NodeJS for your operating system here: https://nodejs.org/en/download/package-manager/
- Install Git on your machine (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Run npm install
  `cd /path/to/project npm install`
- Start server using the built in script - this will ensure webpack builds the React app
  `npm start`
- Visit http://localhost:3000 in a browser to see the application

**Running the "dev" script will start a webpack build process which will compile all the React components and CSS into a single bundle file. It will also start a nodemon instance of the server which means it will automatically restart and rebuild when you make a change to a Javascript file.**

#### Directory Structure

```
.
├── config (contains server specific config file)
├── client (frontend React code)
│   └── components
├── public (static, publicly available files)
│   ├── dist (contains generated files, do not edit any files in here)
│   └── img (static image files)
├── routes (API routing configuration)
├── server (backend processing)
└── server.js (main file)
```

