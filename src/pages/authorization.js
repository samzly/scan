import React, {useState} from "react";
import Layout from "/src/components/layout/layout";
import styled from "styled-components";
import {inputStyle, primary, primaryGrey, primaryLight, secondaryBlue} from "/src/styles/variables";
import Button from "/src/components/common/Button";
import buttonGoogle from '/src/assets/images/AutorizationPage/button_google.svg';
import buttonFacebook from '/src/assets/images/AutorizationPage/button_facebook.svg';
import buttonYandex from '/src/assets/images/AutorizationPage/button_yandex.svg';
import background from '/src/assets/images/AutorizationPage/background__authorization.svg';

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding-top: 69px;
  padding-bottom: 80px;
  gap: 20px;
  background: url('${background}') 10% 70% no-repeat;
  .title {
    font-size: 40px;
    letter-spacing: 0.8px;
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
  .label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: 80px;
    font-size: 16px;
    letter-spacing: 0.32px;
    color: ${primaryGrey};
    &:nth-child(3) {
      margin-bottom: 10px;
    }
    .input {
      ${inputStyle};
      font-size: 16px;
      letter-spacing: 0.16px;
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
  }
  .sign_in {
    width: 151px;
    color: ${primary};
    border-color: ${primary};
  }
  .sign_up {
    width: 213px;
    color: ${primaryGrey};
    border-color: ${primaryGrey};
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

const AuthorizationPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <Layout>
            <Main>
                <h1 className='title'>
                    Для оформления подписки <br/>
                    на тариф, необходимо <br/>
                    авторизоваться.
                </h1>
                <AuthorizationForm method='POST' action='/' onSubmit={submitHandler}>
                    <Sign>
                        <a className='sign_in' href='/authorization'>Войти</a>
                        <a className='sign_up' href='/'>Зарегистрироваться</a>
                    </Sign>
                    <label className='label'>
                        Логин или номер телефона:
                        <input className='input' type='text' value={login} required onChange={e => setLogin(e.target.value)}/>
                    </label>
                    <label className='label'>
                        Пароль:
                        <input className='input' type='password' value={password} required onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <Button type='submit' width='379px' activeCondition={login && password}>Войти</Button>
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