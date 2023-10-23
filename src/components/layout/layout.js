import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as styles from "/src/styles/global.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "/src/store/slices/userSlice";
import { smallScreen } from "/src/styles/variables";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  scroll-behavior: smooth;
  & > * {
    padding: 0 60px;
    @media ${smallScreen} {
      padding: 0 14px;
    }
  }
`

const Layout = ({ children }) => {

    const
        now = (new Date()).getTime(),
        expire = useSelector(state => state.user.expire),
        expireDate = (new Date(expire)).getTime(),
        dispatch = useDispatch();

    if (expireDate < now) {
        dispatch(logOut())
    }

    return (
        <Container>
            <Header />
                {children}
            <Footer />
        </Container>
    )
}

export default Layout

export const Head = () => <>
    <title>Сервис "СКАН"</title>
    <link rel='stylesheet' href={styles} />
</>