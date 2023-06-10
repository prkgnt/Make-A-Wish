import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignInEmail = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
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
    <>
      <Form onSubmit={onSubmit}>
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
        <SubmitBtn type="submit" value="로그인" />
      </Form>
      <SignUpBtn to="signUp">회원가입</SignUpBtn>
    </>
  );
};

const Form = styled.form`
  display: flex;
  text-align: center;
  flex-direction: column;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 30px;
  margin: 10px 10px;
  padding: 0px 10px;
`;
const SubmitBtn = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 30px;
  margin: 10px 10px;
  background-color: #fca311;
  border: 0px;
  font-weight: 700;
`;

const SignUpBtn = styled(Link)`
  width: 300px;
  height: 30px;
  border-radius: 30px;
  background-color: #14213d;
  text-align: center;
  justify-content: center;
  color: white;
  text-decoration-line: none;
  padding-top: 2px;
  font-weight: 700;
`;

export default SignInEmail;
