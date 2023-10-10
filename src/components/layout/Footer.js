import React from "react";
import styled from "styled-components";
import {colorAddSecondary, colorPrimary, colorSecondary, colorTertiary} from "/src/styles/variables";
import logo from '/src/assets/images/Footer/logo.svg';

const Container = styled.div`
  height: 137px;
  background: ${colorPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Logo = styled.img`
  height: 100%;
  grid-area: 1 / 1 / 2 / 2;
  justify-self: left;
`
const Contacts = styled.div`
  //при коммерческом использовании сайта, необходимо раскомментировать строки ниже
  // .icons *, .icons {
  //   margin: 0;
  //   font-size: 10px;
  //   color: ${colorAddSecondary};
  // }
  .text {
    margin: 20px 0;
    color: ${colorTertiary};
    text-align: right;
    font-size: 14px;
  }
`

const Footer = () => {
    return (
        <Container>
            <Logo src={logo} alt='' />
            <Contacts>
                <p className='text'>г. Москва, Цветной б-р, 40 <br/> +7 495 771 21 11 <br/> info@skan.ru </p>
                {/*при коммерческом использовании сайта, необходимо раскомментировать строку ниже*/}
                {/*<p className='icons'>Used icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>*/}
                <p className='text'>Copyright. 2023</p>
            </Contacts>
        </Container>
    )
}

export default Footer