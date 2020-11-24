import React, { useReducer } from 'react'
import { ACTION_TYPE } from './constants/ActionType'

import Layout from './components/Layout'

const reducer = (state, action) => {
  switch (action.type) {
    default: 
      throw new Error("You must use one of the enumerated ACTION_TYPES")
  }
}

const init = {
  games: [{}],
  users: [{}],
}

const App = () => {
  const [store, dispatch] = useReducer(reducer, init)

  return (
    <Layout>
      Mundungus App
    </Layout>
  )
}

export default App
