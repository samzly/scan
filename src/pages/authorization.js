import React from "react";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import { inputStyle, primary, primaryGrey, primaryLight, secondaryBlue, secondaryError, smallScreen } from "/src/styles/variables";
import Button from "/src/components/common/Button";
import buttonGoogle from "/src/assets/images/AutorizationPage/button_google.svg";
import buttonFacebook from "/src/assets/images/AutorizationPage/button_facebook.svg";
import buttonYandex from "/src/assets/images/AutorizationPage/button_yandex.svg";
import background from "/src/assets/images/AutorizationPage/background__authorization.svg";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "/src/store/slices/userSlice";
import { navigate } from "gatsby";
import instance from "/axios";
import useLogin from "/src/hooks/useLogin";
import usePassword from "/src/hooks/usePassword";
import imageLock from "/src/assets/images/AutorizationPage/image_lock.svg";

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding-top: 69px;
  padding-bottom: 80px;
  gap: 20px;
  background: url('${background}') 10% 70% no-repeat;
  @media ${smallScreen} {
    flex-direction: column;
    padding-top: 31px;
    padding-bottom: 485px;
    background-position: 50% 90%;
    gap: 126px;
  }
  .title {
    font-size: 40px;
    letter-spacing: 0.8px;
    @media ${smallScreen} {
      font-size: 22px;
      letter-spacing: 0.44px;
    }
  }
`
const AuthorizationForm = styled.form`
  width: 429px;
  height: 523px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-right: 81px;
  padding: 25px;
  border-radius: 10px;
  background: ${primaryLight};
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  @media ${smallScreen} {
    width: 100%;
    padding: 25px 15px 20px;
  }
  .label {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 15px;
    height: 80px;
    font-size: 16px;
    letter-spacing: 0.32px;
    color: ${primaryGrey};
    @media ${smallScreen} {
      font-size: 14px;
    }
    &:nth-child(3) {
      margin-bottom: 10px;
    }
    &:last-child {
      @media ${smallScreen} {
        justify-content: end;
      }
    }
    .input {
      ${inputStyle};
      font-size: 16px;
      letter-spacing: 0.16px;
    }
    .error {
      color: ${secondaryError};
      font-size: 14px;
      letter-spacing: 0.14px;
      position: absolute;
      bottom: -20px;
      width: 210px;
      text-align: center;
      left: calc(50% - 210px / 2);
      @media ${smallScreen} {
        font-size: 12px;
      }
    }
    .input_error {
      color: ${secondaryError};
      font-size: 16px;
      letter-spacing: 0.16px;
      &::placeholder {
        color: ${secondaryError};
      }
    }
  }
  .password-restore {
    font-size: 14px;
    color: ${secondaryBlue};
    margin-top: -5px;
  }
`
const Sign = styled.div`
  height: 58px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .sign_in, .sign_up {
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    border-bottom: 2px solid;
    height: max-content;
    padding-bottom: 8px;
    @media ${smallScreen} {
      font-size: 14px;
    }
  }
  .sign_in {
    width: 151px;
    color: ${primary};
    border-color: ${primary};
    @media ${smallScreen} {
      width: 103px;
    }
  }
  .sign_up {
    width: 213px;
    color: ${primaryGrey};
    border-color: ${primaryGrey};
    @media ${smallScreen} {
      width: 182px;
    }
  }
`
const LoginSocial = styled.div`
  display: flex;
  gap: 10px;
`
const ButtonSocial = styled.a`
  width: 96px;
  height: 31px;
  border-radius: 3px;
  border: none;
  background: url('${props => props.$img}') no-repeat center;
  background-size: contain;
`
const Image = styled.div`
  background: url(${imageLock}) center no-repeat;
  width: 75px;
  height: 100px;
  position: absolute;
  right: 550px;
  top: 107px;
  @media ${smallScreen} {
    top: 273px;
    right: 55%;
  }
`

const AuthorizationPage = () => {

    const isAuthorized = useSelector(state => state.user.isAuthorized);
    if (isAuthorized) {
        navigate('/')
    }

    const
        [login, setLogin, errorLogin, setErrorLogin] = useLogin(),
        [password, setPassword, errorPassword, setErrorPassword] = usePassword();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!login) {
            setErrorLogin(true);
            return
        }
        if (!password) {
            setErrorPassword(true);
            return
        }
        try {
            const response = await instance.post('account/login', {
                'login': login.replaceAll(' ', ''),
                'password': password.replaceAll(' ', ''),
            });
            await dispatch(logIn(response.data));
            navigate('/');
        } catch (e) {
            setErrorPassword(true)
            navigate('/authorization');
            console.log(`It's a Bird... It's a Plane... It's ${e}!`)
        }
    }

    return (
        <Layout>
            <Main>
                <Image />
                <h1 className='title'>
                    Для оформления подписки <br/>
                    на тариф, необходимо <br/>
                    авторизоваться.
                </h1>
                <AuthorizationForm method='post' onSubmit={handleSubmit}>
                    <Sign>
                        <a className='sign_in' href='/authorization'>Войти</a>
                        <a className='sign_up' href='/'>Зарегистрироваться</a>
                    </Sign>
                    <label className='label'>
                        Логин или номер телефона:
                        <input className={'input' + (errorLogin ? ' input_error' : '')} type='text' value={login} onChange={setLogin}/>
                        {errorLogin ? <div className='error error_date'>Введите корректные данные</div> : null}
                    </label>
                    <label className='label'>
                        Пароль:
                        <input className={'input' + (errorPassword ? ' input_error' : '')} type='password' value={password} onChange={setPassword}/>
                        {errorPassword ? <div className='error error_date'>Неправильный пароль</div> : null}
                    </label>
                    <Button type='submit' width={
                        window.matchMedia('(max-width: 400px)').matches ? null : '379px'
                    } activeCondition={!errorPassword && !errorLogin && !isAuthorized}>
                        Войти
                    </Button>
                    <a className='password-restore' href='/authorization'>Восстановить пароль</a>
                    <label className='label'>
                        Войти через:
                        <LoginSocial>
                            <ButtonSocial href='/authorization' $img={buttonGoogle}/>
                            <ButtonSocial href='/authorization' $img={buttonFacebook}/>
                            <ButtonSocial href='/authorization' $img={buttonYandex}/>
                        </LoginSocial>
                    </label>
                </AuthorizationForm>
            </Main>
        </Layout>
    )
}

export default AuthorizationPage

export const Head = () => <>
    <title>Сервис "СКАН" - Авторизация</title>
</>