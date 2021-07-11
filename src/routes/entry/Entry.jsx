import React from "react";
import styled from "styled-components";
import { Switch, Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import EntryRoute from "../types/EntryRoute";
import SignUp from "./SignUp";
import Login from "./Login";

function Entry() {
  const location = useLocation();
  const { theme } = useTheme(); // Change the background image

  return (
    <Container $theme={theme}>
      <Content>
        <Header>
          {location.pathname === "/auth/login" ? (
            <>
              <Link to="/auth/signup">Sign Up</Link>
              <span>Log In</span>
            </>
          ) : (
            <>
              <span>Sign Up</span>
              <Link to="/auth/login">Log In</Link>
            </>
          )}
        </Header>

        <main>
          <Switch>
            <EntryRoute exact path="/auth/login" component={Login} />
            <EntryRoute exact path="/auth/signup" component={SignUp} />
          </Switch>
        </main>

        <Footer>
          <button type="button">
            Or try Lechat with a pre-existing account &#129042; {/* 🠒 */}
          </button>
        </Footer>
      </Content>
    </Container>
  );
}

export default Entry;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: url(${(props) =>
    props.$theme === "light"
      ? "https://firebasestorage.googleapis.com/v0/b/aurelie-nguyen.appspot.com/o/lechat%2F869v2.png?alt=media&token=6a310bf7-62fd-41e6-94c5-0e13b3dd821a"
      : "https://firebasestorage.googleapis.com/v0/b/aurelie-nguyen.appspot.com/o/lechat%2F435928.png?alt=media&token=15e58dbc-2f72-4149-a581-6a2f2f1f5144"});
  background-size: cover;
`;

const Content = styled.div`
  display: grid;
  grid-column: 2;
  border-radius: 1rem 0 0 1rem;
  grid-template-rows: min-content auto min-content;
  padding: 5rem;
  background: ${(props) => props.theme.bg_secondary};
`;

const Header = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 5rem;

  & > a {
    color: ${(props) => props.theme.text_tertiary};
    padding: 0.3rem 0.6rem;

    &:hover {
      text-decoration: underline;
    }
  }

  & > span {
    background: ${(props) => props.theme.bg_primary};
    padding: 0.3rem 0.6rem;
    border-radius: 3px;
    color: ${(props) => props.theme.text_secondary};
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;

  & > button {
    color: ${(props) => props.theme.text_tertiary};

    &:hover {
      text-decoration: underline;
    }
  }
`;
