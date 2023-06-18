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
        switch (error.code) {
          case "auth/invalid-email":
            alert("형식에 맞게 입력해주세요!");
            break;
          case "auth/user-disabled":
            alert("해당 계정은 비활성화 상태에요!");
            break;
          case "auth/user-not-found":
            alert("해당 이메일은 존재하지 않아요!");
            break;
          case "auth/wrong-password":
            alert("비밀번호가 맞지 않아요!");
            break;
          case "auth/network-request-failed":
            alert("네트워크 연결에 실패했어요!");
            break;
          case "auth/too-many-requests":
            alert("요청이 너무 많아요! 잠시 후 다시 시도해주세요!");
            break;
          default:
            alert("알 수 없는 에러가 발생했어요! 잠시 후 다시 시도해주세요!");
        }
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
  font-size: 18px;
  font-family: SingleDays;
  color: white;
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
  font-family: SingleDays;
  color: white;
`;

export default SignInEmail;
