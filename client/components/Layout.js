import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-size: 1rem;
  overflow: hidden;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: .75em;
  overflow: hidden;
  background-color: black;
  color: white;
  font-size: 1.2rem;
`

const StyledHeaderName = styled.div`
  flex: 1;
`

const StyledUsername = styled.div`
  padding: 0.25em 1em;
  border-radius: 0.5em;
  background: white;
  color: black;
  font-size: 0.9rem;
`

const StyledContent = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem 2rem;
  overflow: hidden auto;
`

const Layout = ({ children, username }) => {
  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledHeaderName>
          Mundungus Fletcher
        </StyledHeaderName>
        {username && <StyledUsername>{username}</StyledUsername>}
      </StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledWrapper>
  )
}

export default Layout