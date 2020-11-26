import React, { useReducer, useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

import Button from './components/Button'
import CardList from './components/CardList'
import GameNamesInput from './components/GameNamesInput'
import Layout from './components/Layout'
import NewUserForm from './components/NewUserForm'

import { ACTION_TYPE } from './constants/ActionType'

const socket = io('/')

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_USERS:
      return {...state, users: action.users.map(x => { return {name: x }})}
    case ACTION_TYPE.NEW_GAME:
      return {...state, game: { id: action.id }}
    case ACTION_TYPE.UPDATE_NAMES:
      return {...state, game: { ...state.game, names: action.names }}
    default: 
      throw new Error("You must use one of the enumerated ACTION_TYPES")
  }
}

const init = {
  game: null,
  users: [],
}

const StyledUser = styled.span`
  margin-left: 1em;
  padding: 0.25em 1em;
  border: 0.1em solid black;
  border-radius: 0.5em;
  font-size: 0.9rem;
`

const StyledContainer = styled.div`
  margin-top: 2em;
`

const App = () => {
  const [store, dispatch] = useReducer(reducer, init)
  const [newUser, setNewUser] = useState(true)
  const [username, setUsername] = useState()
  const [namesSubmitted, setNamesSubmitted] = useState(false)

  useEffect(() => {
    // socket.io event listeners - event handlers in server/gameserver.js
    socket.on('newUser', (user) => {
      dispatch({
        type: ACTION_TYPE.NEW_USER, 
        user: user})
    })
    socket.on('onUserUpdate', (users) => {
      dispatch({
        type: ACTION_TYPE.UPDATE_USERS,
        users: users,
      })
    })
    socket.on('startNewGame', (gameId) => {
      dispatch({
        type: ACTION_TYPE.NEW_GAME,
        id: gameId
      })
    })
    socket.on('onNamesUpdate', (names) => {
      dispatch({
        type: ACTION_TYPE.UPDATE_NAMES,
        names: names,
      })
    })
  }, [])

  const handleSubmitUsername = () => {
    socket.emit('setUsername', username)
    setNewUser(false)
  }

  const handleNewGame = () => {
    socket.emit('newGame', new Date().toISOString())
  }

  const handleNamesSubmit = (namesList) => {
    setNamesSubmitted(true)
    socket.emit('submitNames', { names: namesList, gameId: store.game.id })
  }

  return (
    <Layout username={newUser ? "" : username}>
      {newUser || !username ? <NewUserForm username={username} setUsername={setUsername} onSubmit={handleSubmitUsername} />
      : (
        <>
          Online:
          {store.users?.length > 0 && <CardList list={store.users} />}
          {store.game ? (
            namesSubmitted ? (
              <>
                <StyledContainer>
                  Thanks for submitting your names! 
                </StyledContainer>
                <StyledContainer>
                  Waiting for other players...
                </StyledContainer>
              </>
            ) : (
              <StyledContainer>
                {store.game.names?.length > 0 && <CardList list={store.game.names}/>}
                <GameNamesInput onSubmit={handleNamesSubmit} />
              </StyledContainer>
            )
          ) : (
            <StyledContainer>
              <Button isBlock onClick={handleNewGame}>New Game</Button>
            </StyledContainer>
          )}
        </>
      )}
    </Layout>
  )
}

export default App
