import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  padding: 0.25em 1em;
  margin: 1em;
  font-size: 12px;
  cursor: pointer;
  }
`;



const Toggle = ({theme,  toggleTheme }) => {
    return (
      <Button onClick={toggleTheme}>
        Switch Theme
      </Button>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;
