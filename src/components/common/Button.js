import React from "react";
import styled from "styled-components";
import {secondaryBlue, primaryLight} from "/src/styles/variables";

const ButtonActive = styled.button`
  height: 59px;
  width: ${props => props.$width || '355px'};
  border: none;
  border-radius: 5px;
  background-color: ${props => props.$backgroundColor || secondaryBlue};
  cursor: pointer;
  color: ${props => props.$color || primaryLight};
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.22px;
`
const ButtonInActive = styled(ButtonActive)`
  opacity: 0.5;
  cursor: not-allowed;
`

const Button = (props) => {
    return (
        <>
            {props.activeCondition
                ?
                <ButtonActive $width={props.width} $backgroundColor={props.backgroundColor} $color={props.color}>{props.children}</ButtonActive>
                :
                <ButtonInActive $width={props.width} $color={props.color} onClick={e => e.preventDefault()}>{props.children}</ButtonInActive>
            }
        </>
    )
}

export default Button