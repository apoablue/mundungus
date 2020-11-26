import React, { useState } from 'react'
import styled from 'styled-components'

import Button from './Button'
import CardList from './CardList'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`

const StyledForm = styled.form`
  width: 100%;
`

const StyledFieldContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5em;
  align-items: center;
`

const StyledLabel = styled.label`
  min-width: 20%;
`

const StyledInput = styled.input`
  width: 80%;
  margin-left: 1em;
  padding: 0.25em;
`

const StyledButton = styled(Button)`
  margin-top: 1em;
`

const StyledNamesContainer = styled.div`
  display: flex;
  margin-top: 1em;
`

const GameNamesInput = ({ onSubmit }) => {
  const [currentName, setCurrentName] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [namesList, setNamesList] = useState([])

  const onSubmitName = (e) => {
    e.preventDefault()
    const newName = { name: currentName, description: currentDescription }
    setNamesList([...namesList.concat(newName)])
    setCurrentName("")
    setCurrentDescription("")
  }

  return (
    <StyledWrapper>
      Enter names to put in the Mundungus hat
      <StyledForm onSubmit={(e) => onSubmitName(e)}>
        <StyledFieldContainer>
          <StyledLabel>Name:</StyledLabel>
          <StyledInput onChange={e => setCurrentName(e.target.value)} type="text" value={currentName} />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledLabel>Description:</StyledLabel>
          <StyledInput onChange={e => setCurrentDescription(e.target.value)} type="text" value={currentDescription} />
        </StyledFieldContainer>      
        <StyledButton disabled={!currentName} isBlock>Add name</StyledButton>
      </StyledForm>
      {namesList.length > 0 && (
        <>
          <StyledButton isBlock onClick={() => onSubmit(namesList)}>Submit your names</StyledButton>
          <StyledNamesContainer>
            <CardList list={namesList} />
          </StyledNamesContainer>
        </>
      )}
    </StyledWrapper>
  )
}

export default GameNamesInput