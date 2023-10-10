import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from '/src/styles/global.css';
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  & > * {
    padding: 0 60px;
  }
`

const Layout = ({ children }) => {
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