import React from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Setting from "../components/modals/user/Setting";
import Email from "../components/settings/Email";
import Password from "../components/settings/Password";
import Username from "../components/settings/Username";
import Avatar from "../components/settings/Avatar";
import LogOut from "../components/settings/LogOut";

function Settings() {
  const { user } = useAuth();

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
        <Subheading>Deactivate Account</Subheading>
        <Field>
          <div>
            <Information>Account Removal</Information>
            <small>If you delete your account, you will not be able to recover it.</small>
          </div>
        </Field>
      </Section>

      <LogOut />
    </Container>
  );
}

export default Settings;

const Container = styled.main`
  width: 100%;
  padding: 3rem;
  background: ${(props) => props.theme.bg_secondary};
  margin-top: 1rem;
  border-radius: 1rem 1rem 0 0;
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