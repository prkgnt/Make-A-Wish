import React, { useState } from "react";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaBars,
  FaGoogle,
  FaApple,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInEmail from "./SignInEmail";

const Auth = () => {
  const [emailToggle, setEmailToggle] = useState(false);

  return (
    <Container>
      <Header>
        {emailToggle ? (
          <>
            <FaArrowLeft
              onClick={() => {
                setEmailToggle((prev) => !prev);
              }}
            ></FaArrowLeft>
            <Text>이메일로 로그인</Text>
          </>
        ) : (
          <>
            <div></div>
            <Text>시작하기</Text>
          </>
        )}

        <FaBars></FaBars>
      </Header>
      {emailToggle ? (
        <SignInEmail />
      ) : (
        <>
          <Description />
          <SignInBtn
            onClick={() => {
              setEmailToggle((prev) => !prev);
            }}
          >
            <FaEnvelope style={{ position: "relative", left: "-70px" }} />
            이메일로 시작하기
          </SignInBtn>
          <SignInBtn style={{ backgroundColor: "#00C4FF" }}>
            <FaGoogle style={{ position: "relative", left: "-75px" }} />
            구글로 시작하기
          </SignInBtn>
          <SignInBtn style={{ backgroundColor: "#9BABB8" }}>
            <FaApple style={{ position: "relative", left: "-75px" }} />
            애플로 시작하기
          </SignInBtn>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Text = styled.p``;
const Description = styled.div`
  width: 300px;
  height: 500px;
  border-radius: 30px;
  background-color: black;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 30px;
  width: 300px;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid black;
`;

const SignInBtn = styled.button`
  width: 300px;
  height: 30px;
  border-radius: 30px;
  margin: 10px 10px;
  border: 0px;
  background-color: #fca311;
  font-weight: 600;
`;

export default Auth;
