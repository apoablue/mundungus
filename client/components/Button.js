import React, { Children } from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  padding: 0.25em 0.5em;
  font-size: 1.1rem;
  ${props => !props.disabled && css`
    cursor: pointer;
  `}
  ${props => props.isBlock && css`
    width: 100%;
  `}
`

const Button = ({ children, className, disabled, isBlock, onClick }) => {
  return (
    <StyledButton 
      className={className}
      disabled={disabled} 
      isBlock={isBlock}
      onClick={disabled ? () => {} : onClick}>
      {children}
    </StyledButton>
  )
}

export default Button