import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { secondaryAqua, primaryDark, primaryLight, smallScreen, primary } from "/src/styles/variables";
import logo from "/src/assets/images/Header/logo.svg";
import logoMobile from "/src/assets/images/Footer/logo.svg";
import { Link } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import instance from "/axios";
import { getLimits, logOut } from "/src/store/slices/userSlice";
import Loader from "/src/components/common/Loader";


const Container = styled.div`
  height: 93px;
  background: ${primaryLight};
  display: grid;
  grid-template-columns: 415px 1fr 415px;
  align-items: center;
  @media ${smallScreen} {
    display: flex;
    justify-content: space-between;
  }
`
const Logo = styled.img`
  height: 100%;
  grid-area: 1 / 1 / 2 / 2;
  justify-self: left;
`
const Navigation = styled.nav`
  grid-area: 1 / 2 / 2 / 3;
  justify-self: center;
  @media ${smallScreen} {
    display: none;
  }
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
  color: ${primaryDark};
`
const User = styled.div`
  width: 415px;
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isAuthorized ? 'space-between' : 'end'};
  @media ${smallScreen} {
    width: 135px;
    justify-content: center;
    align-items: start;
  }
  .registry {
    text-decoration: none;
    letter-spacing: 0.14px;
    font-size: 14px;
    opacity: 0.4;
  }
  .info_container {
    width: 175px;
    height: 63px;
    border-radius: 5px;
    background: rgba(217, 217, 217, 0.3);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    column-gap: 7px;
    @media ${smallScreen} {
      width: 132px;
      height: 75px;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: start;
      padding-left: 10px;
      justify-content: space-around;
      column-gap: 0;
    }
    .info {
      font-size: 10px;
      opacity: 0.4;
      @media ${smallScreen} {
        font-size: 8px;
        font-weight: 400;
        letter-spacing: 0.08px;
      }
    }
    .info_count, .info_limit {
      font-size: 14px;
      font-weight: 700;
    }
    .info_limit {
      color: #8AC540;
    }
  }
  .user_container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 5px;
    align-items: end;
    width: 111px;
    height: 32px;
    @media ${smallScreen} {
      display: none;
    }
    .user_name {
      font-size: 14px;
      opacity: 0.7;
    }
  }
`
const ButtonLogin = styled(Link)`
  width: 65px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background: ${secondaryAqua};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.14px;
  @media ${smallScreen} {
    width: 295px;
    height: 52px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
    line-height: 52px;
    margin-top: 20px;
  }
`
const ButtonLogout = styled.button`
  background: none;
  border: none;
  opacity: 0.4;
  font-size: 10px;
  cursor: pointer;
`
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`
const BurgerButton = styled.div`
  display: none;
  cursor: pointer;
  margin-right: 14px;
  @media ${smallScreen} {
    display: block;
  }
`
const BurgerContainer = styled.div`
  height: 494px;
  width: 100%;
  position: absolute;
  padding: 0 14px;
  top: 0;
  left: 0;
  z-index: 100;
  background: ${primary};
  display: none;
  @media ${smallScreen} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .registry {
    color: ${primaryLight};
    text-decoration: none;
    font-size: 16px;
    letter-spacing: 0.16px;
    opacity: 0.4;
  }
`
const BurgerNavigation = styled.div`
  margin: 36px 0 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  list-style-type: none;
`
const BurgerItem = styled(Link)`
  color: ${primaryLight};
  font-size: 16px;
  letter-spacing: 0.16px;
  text-decoration: none;
`
const BurgerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px;
  width: 100%;
`
const BurgerButtonClose = styled.div`
  margin-right: 14px;
`

const BurgerMenu = props => {

    return (
        <BurgerContainer>
            <BurgerHeader>
                <Logo src={logoMobile} alt=''/>
                <BurgerButtonClose onClick={props.onClickShow}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3.53613" width="30" height="5" transform="rotate(45 3.53613 0)" fill={primaryLight}/>
                        <rect x="24.7485" y="3.53564" width="30" height="5" transform="rotate(135 24.7485 3.53564)" fill={primaryLight}/>
                    </svg>
                </BurgerButtonClose>
            </BurgerHeader>
            <BurgerNavigation>
                <li><BurgerItem to='/' onClick={props.onClickShow}>Главная</BurgerItem></li>
                <li><BurgerItem to='/' onClick={props.onClickShow}>Тарифы</BurgerItem></li>
                <li><BurgerItem to='/' onClick={props.onClickShow}>FAQ</BurgerItem></li>
            </BurgerNavigation>
            {props.isAuthorized ? null : <a className='registry' href='/'>Зарегистрироваться</a>}
            <ButtonLogin to='/authorization' onClick={props.isAuthorized ? props.onClick : props.onClickShow}>{props.isAuthorized ? 'Выйти' : 'Войти'}</ButtonLogin>
        </BurgerContainer>
    )
}

const Header = () => {

    const
        isAuthorized = useSelector(state => state.user?.isAuthorized),
        usedCompanyCount = useSelector(state => state.user.usedCompanyCount),
        companyLimit = useSelector(state => state.user.companyLimit),
        userName = useSelector(state => state.user.userName),
        userAvatar = useSelector(state => state.user.userAvatar);

    const
        [loader, setLoader] = useState(false),
        [isShown, setShown] = useState(false);

    const dispatch = useDispatch()

    const UserNotAuthorized = () => (
        <>
            <a className='registry' href='/'>Зарегистрироваться</a>
            <svg width='40px' height='26px'>
                <rect width='2px' height='26px' x='18px' fill={secondaryAqua} stroke={secondaryAqua}/>
            </svg>
            <ButtonLogin to='/authorization'>Войти</ButtonLogin>
        </>
    )

    const UserAuthorized = () => (
        <>
            <div className='info_container'>
                <Loader loader={loader}>
                    <span className='info'>Использовано компаний: </span><span className='info_count'>{usedCompanyCount}</span>
                    <span className='info'>Лимит по компаниям: </span><span className='info_limit'>{companyLimit}</span>
                </Loader>
            </div>
            <div className='user_container'>
                <strong className='user_name'>{userName}</strong>
                <ButtonLogout onClick={() => dispatch(logOut())}>Выйти</ButtonLogout>
                <Avatar src={userAvatar}/>
            </div>

        </>
    )

    const fetchData = async () => {
        if (isAuthorized) {
            setLoader(true);
            const response = await instance.get('account/info');
            dispatch(getLimits(response.data.eventFiltersInfo));
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchData().catch(e => console.log(`It's a Bird... It's a Plane... It's ${e}!`))
    }, [])


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
            <User $isAuthorized={isAuthorized}>
                {isAuthorized ? <UserAuthorized usedCompanyCount={usedCompanyCount}/> : <UserNotAuthorized/>}
            </User>
            <BurgerButton onClick={() => setShown(true)}>
                <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="5" fill={primary}/>
                    <rect y="10" width="30" height="5" fill={primary}/>
                    <rect y="20" width="30" height="5" fill={primary}/>
                </svg>
            </BurgerButton>
            {isShown ? <BurgerMenu isAuthorized={isAuthorized} onClickShow={() => setShown(false)} onClick={() => dispatch(logOut())}/> : null}
        </Container>
    )
}

export default Header;