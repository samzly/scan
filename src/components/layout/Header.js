import React from "react";
import styled from "styled-components";
import { colorAddSecondary, colorSecondary, colorTertiary } from "/src/styles/variables";
import logo from '/src/assets/images/Header/logo.svg';
import { Link } from "gatsby";
                                                                                               // MOCK
import { store } from "../../MOCKS";

const Container = styled.div`
  height: 93px;
  background: ${colorTertiary};
  display: grid;
  grid-template-columns: 415px 1fr 415px;
  align-items: center;
`
const Logo = styled.img`
  height: 100%;
  grid-area: 1 / 1 / 2 / 2;
  justify-self: left;
`
const Navigation = styled.nav`
  grid-area: 1 / 2 / 2 / 3;
  justify-self: center;
`
const NavigationList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 236px;
  list-style-type: none;
  padding: 0;
`
const Item = styled(Link)`
  text-decoration: none;
  letter-spacing: 0.14px;
  font-size: 14px;
  color: ${colorSecondary};
`
const User = styled.div`
  width: 415px;
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  align-items: center;
  
                                                                               //                 MOCK
  
  
  justify-content: ${store.isAuthorized ? 'space-between' : 'end'};
  .registry {
    letter-spacing: 0.14px;
    font-size: 14px;
    opacity: 0.4;
  }
`
const Button = styled.button`
  width: 65px;
  height: 26px;
  border: none;
  border-radius: 5px;
  background: ${colorAddSecondary};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.14px;
`

const userNotAuthorized = <>
    <span className='registry'>Зарегистрироваться</span>
    <svg width='40px' height='26px'>
        <rect width='2px' height='26px' x='18px' fill={colorAddSecondary} stroke={colorAddSecondary}/>
    </svg>
    <Button>Войти</Button>
</>

const Header = () => {
    return (
        <Container>
            <Logo src={logo} alt=''/>
            <Navigation>
                <NavigationList>
                    <li><Item to='/'>Главная</Item></li>
                    <li><Item to='/'>Тарифы</Item></li>
                    <li><Item to='/'>FAQ</Item></li>
                </NavigationList>
            </Navigation>
            <User>


                                                                                        {/*MOCK*/}



                {store.isAuthorized ? null : userNotAuthorized}
            </User>
        </Container>
    )
}

export default Header