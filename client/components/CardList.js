import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  display: inline-block;
  margin: 0.5em 0 0.5em 0.5em;
  padding: 0.25em 1em;
  border: 0.1em solid black;
  border-radius: 0.5em;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
`

const StyledDescription = styled.div`
  font-weight: normal;
`

const CardList = ({ list }) => {
  return (
    <>
      {list.map((listItem, index) => (
        <StyledCard key={listItem.id || index}>
          {listItem.name}
          {listItem.description && <StyledDescription>{listItem.description}</StyledDescription>}
        </StyledCard>
      ))}
    </>
  )
}

export default CardList