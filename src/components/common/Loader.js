import React, {useEffect, useState} from "react";
import styled from "styled-components";
import spinner from '/src/assets/images/Loader/spinner.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  .text {
    width: 100%;
    letter-spacing: 0.36px;
    text-align: center;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`
const Spinner = styled.img`
  height: 30%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(-90deg);
    }
    20% {
      transform: rotate(0);
    }
    40% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(135deg);
    }
    65% {
      transform: rotate(180deg);
    }
    85% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }
`

const Loader = (props) => {

    return (
        props.loader
            ?
            <Container>
                {props.text?.match(/не/i) ? null : <Spinner src={spinner}/>}
                {props.text ? <p className='text'>{props.text}</p> : null}
            </Container>
            :
            <>
                {props.children}
            </>
    )
}

export default Loader