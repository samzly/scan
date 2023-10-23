import React from "react";
import styled from "styled-components";
import { primaryLight, smallScreen } from "/src/styles/variables";

const Container = styled.div`
  width: 400px;
  height: 225px;
  border-radius: 10px;
  background: ${primaryLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.20);
  padding: 20px;
  letter-spacing: 0.18px;
  @media ${smallScreen} {
    width: 298px;
    height: 188px;
    padding: 10px;
    * {
      font-size: 16px
    }
  }
`
const Image = styled.div`
  width: 65px;
  height: 79px;
  background: url('${props => props.$img}') no-repeat center;
  background-size: contain;
  margin-bottom: 12px;
  @media ${smallScreen} {
    width: 55px;
    margin: 0;
  }
`

const Slide = (props) => {
    return (
        <Container key={props.key}>
            <Image $img={props.img}/>
            <p>{props.children}</p>
        </Container>
    )
}

export default Slide