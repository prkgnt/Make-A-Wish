import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Container = styled.div``;
const Input = styled.input``;
const SubmitBtn = styled.input``;

const Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    //event.target => 이벤트가 일어나는 타겟(객체) 의미
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />

        <SubmitBtn type="submit" value="Log-in" />
      </form>
      <Link to="signUp">create new account</Link>
    </Container>
  );
};

export default Auth;
