import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInEmail from "./SignInEmail";
import background from "../images/Group1.png";

const Auth = () => {
  const [emailToggle, setEmailToggle] = useState(false);

  return (
    <Container>
      <Header>
        {emailToggle ? (
          <>
            <FaArrowLeft
              size={24}
              style={{ margin: "auto 0" }}
              onClick={() => {
                setEmailToggle((prev) => !prev);
                window.scrollTo(0, 0);
              }}
            ></FaArrowLeft>
            <Text>이메일로 로그인</Text>
          </>
        ) : (
          <>
            <div style={{ width: 24 }} />
            <Text>시작하기</Text>
          </>
        )}
        <div style={{ width: 24 }} />
      </Header>
      {emailToggle ? (
        <SignInEmail />
      ) : (
        <>
          <Description />
          <SignInBtn
            onClick={() => {
              setEmailToggle((prev) => !prev);
              window.scrollTo(0, 0);
            }}
          >
            <FaEnvelope
              style={{
                position: "relative",
                left: "-68px",
                top: "-2px",
              }}
            />
            이메일로 시작하기
          </SignInBtn>
          <SignInBtn style={{ backgroundColor: "#00C4FF" }}>
            <FaGoogle
              style={{
                position: "relative",
                left: "-75px",
                top: "-2px",
              }}
            />
            구글로 시작하기
          </SignInBtn>
          <SignInBtn style={{ backgroundColor: "#9BABB8" }}>
            <FaApple
              style={{
                position: "relative",
                left: "-75px",
                top: "-2px",
              }}
            />
            애플로 시작하기
          </SignInBtn>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  background-color: #ffdda9;
  flex-direction: column;
`;
const Text = styled.p`
  margin: auto 0;
  font-weight: 600;
`;
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
  width: 300px;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const SignInBtn = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 30px;
  margin: 10px 10px;
  border: 0px;
  background-color: #fca311;
  font-weight: 600;
  color: black;
`;

export default Auth;
