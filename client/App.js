import React, { useReducer, useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

import Button from './components/Button'
import Layout from './components/Layout'
import Username from './components/Username'
import { ACTION_TYPE } from './constants/ActionType'

const socket = io('/')

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_USERS:
      console.log('update', action.users)
      return {...state, users: action.users}
    default: 
      throw new Error("You must use one of the enumerated ACTION_TYPES")
  }
}

const init = {
  games: [],
  users: [],
}

const StyledUser = styled.span`
  margin-left: 1em;
  padding: 0.25em 1em;
  border: 0.1em solid black;
  border-radius: 0.5em;
  font-size: 0.9rem;
`

const StyledButtonContainer = styled.div`
  margin-top: 2em;
`

const App = () => {
  const [store, dispatch] = useReducer(reducer, init)
  const [newUser, setNewUser] = useState(true)
  const [username, setUsername] = useState()

  useEffect(() => {
    socket.on('newUser', (user) => {
      dispatch({
        type: ACTION_TYPE.NEW_USER, 
        user: user})
    })
    socket.on('onUserUpdate', (users) => {
      dispatch({
        type: ACTION_TYPE.UPDATE_USERS,
        users: users
      })
    })
  }, [])

  const handleSubmitUsername = () => {
    socket.emit('setUsername', username)
    setNewUser(false)
  }

  return (
    <Layout username={newUser ? "" : username}>
      {newUser && <Username username={username} setUsername={setUsername} onSubmit={handleSubmitUsername} />}
      Online:
      {store.users?.length > 0 && (
        store.users.map((user) => <StyledUser key={user}>{user}</StyledUser>)
      )}
      {!newUser && username && (
        <StyledButtonContainer>
          <Button isBlock>New Game</Button>
        </StyledButtonContainer>
      )}
    </Layout>
  )
}

export default App
