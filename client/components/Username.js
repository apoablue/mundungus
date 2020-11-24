import React from 'react'
import styled from 'styled-components'

import Button from './Button'

const StyledWrapper = styled.div`
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

const Username = ({ username, setUsername, onSubmit }) => {
  return (
    <StyledWrapper>
      Choose a username
      <StyledInput onChange={e => setUsername(e.target.value)} type="text" />
      <Button disabled={!username} isBlock onClick={onSubmit}>Go</Button>
    </StyledWrapper>
  )
}

export default Username