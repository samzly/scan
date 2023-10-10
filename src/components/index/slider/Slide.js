import React from "react";
import styled from "styled-components";
import {primaryLight} from "/src/styles/variables";

const Container = styled.div`
  width: 400px;
  height: 225px;
  border-radius: 10px;
  background: ${primaryLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.20);
  padding: 20px;
  letter-spacing: 0.18px;
`
const Image = styled.div`
  width: 65px;
  height: 79px;
  background: url('${props => props.$img}') no-repeat center;
  background-size: contain;
  margin-bottom: 12px;
`

const Slide = (props) => {
    return (
        <Container>
            <Image $img={props.img}/>
            <p>{props.children}</p>
        </Container>
    )
}

export default Slide