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
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: .75em;
  overflow: hidden;
  background-color: black;
  color: white;
  font-size: 1.2rem;
  text-align: center;
`

const StyledContent = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  padding: 1.5rem 2rem 2rem;
  overflow: hidden auto;
`

const Layout = ({children}) => {
  return (
    <StyledWrapper>
      <StyledHeader>Mundungus Fletcher</StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledWrapper>
  )
}

export default Layout