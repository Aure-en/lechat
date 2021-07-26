import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Setting from "../components/user/Setting";
import Email from "../components/settings/Email";
import Password from "../components/settings/Password";
import Username from "../components/settings/Username";
import Avatar from "../components/settings/Avatar";
import Theme from "../components/settings/Theme";

function Settings() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <Container>
      <Heading>User Settings</Heading>

      <Section>
        <Subheading>Account Preferences</Subheading>

        <Field>
          <Avatar />
        </Field>

        <Field>
          <Information>Username</Information>
          <div>{user.username}</div>
          <Setting>
            <Username />
          </Setting>
        </Field>

        <Field>
          <Information>Email</Information>
          <div>{user.email}</div>
          <Setting>
            <Email />
          </Setting>
        </Field>

        <Field>
          <Information>Password</Information>
          <small>Password must be at least 6 characters long</small>
          <Setting>
            <Password />
          </Setting>
        </Field>
      </Section>

      <Section>
        <Subheading>Appearance</Subheading>
        <Field>
          <Information>Theme</Information>
          <div>{theme === "light" ? "Light" : "Dark"}</div>
          <Theme />
        </Field>
      </Section>
    </Container>
  );
}

export default Settings;

const Container = styled.main`
  background: ${(props) => props.theme.bg_secondary};
  margin: 1rem;
  border-radius: 1rem;
  padding: 3rem 2rem;

  @media all and (min-width: 576px) {
    padding: 3rem;
  }
`;

const Section = styled.section`
  margin-bottom: 1rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const Subheading = styled.h2`
  font-family: "Assistant", "Trebuchet MS", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.text_tertiary};
  border-bottom: 1px solid ${(props) => props.theme.text_tertiary};
`;

const Field = styled.div`
  display: grid;
  grid-template: repeat(2, auto) / auto 1fr;
  grid-gap: 0.35rem;
  justify-content: space-between;
  margin: 1.5rem 0;

  & > *:nth-child(2) {
    grid-row: 2;
    grid-column: 1;
  }

  & > *:nth-child(3) {
    grid-row: 1 / -1;
    justify-self: end;
  }
`;

const Information = styled.div`
  font-weight: 400;
`;
