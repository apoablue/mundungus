import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`

const StyledInput = styled.input`
  width: 100%;
  margin: 1em 0;
  padding: 0.25em;
`

const NewUserForm = ({ username, setUsername, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      Choose a username
      <StyledInput onChange={e => setUsername(e.target.value)} type="text" />
      <Button disabled={!username} isBlock>Go</Button>
    </StyledForm>
  )
}

export default NewUserForm