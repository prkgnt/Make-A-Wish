import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInEmail from "./SignInEmail";
import DescriptionImage from "../images/Group 7.png";

const Auth = () => {
  const [emailToggle, setEmailToggle] = useState(false);

  return (
    <Container>
      <Circle1></Circle1>
      <Circle2></Circle2>
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
            <Text style={{ fontSize: "22px" }}>이메일로 로그인</Text>
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
          <Description src={DescriptionImage} />
          <SignInBtn
            onClick={() => {
              setEmailToggle((prev) => !prev);
              window.scrollTo(0, 0);
            }}
          >
            <FaEnvelope style={{ transform: "translate(-120px, 11px)" }} />
            <div
              style={{
                fontFamily: "SingleDays",
                fontSize: "18px",
                transform: "translate(10px, -13px)",
              }}
            >
              이메일로 시작하기!
            </div>
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
  font-family: SingleDays;
  font-size: 24px;
  margin: auto 0;
  font-weight: 600;
`;
const Description = styled.img`
  z-index: 1;
  width: 300px;
  height: 500px;
  border-radius: 30px;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin-top: 10px;
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
  margin: 30px 10px;
  border: 0px;
  background-color: #fca311;
  font-weight: 600;
  color: black;
  z-index: 1;
`;
const Circle1 = styled.div`
  position: absolute;
  width: 100px;
  height: 200px;
  right: 0;
  top: 180px;
  border-radius: 150px 0px 0px 150px;
  background: rgba(255, 122, 0, 0.2);
`;
const Circle2 = styled.div`
  position: absolute;
  width: 247px;
  height: 247px;
  left: -91px;
  top: 493px;
  border-radius: 123.5px;
  background: rgba(217, 217, 217, 0.4);
`;

export default Auth;
