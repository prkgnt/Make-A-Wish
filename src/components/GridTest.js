import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const MenuBar = styled.div`
  position: absolute;
  right: -200px;
  transition: transform 0.5s ease;
  width: 200px;
  height: 100vh;
  transform: translate(${(props) => (props.isopen ? "-200px" : "0px")});
  background-color: aliceblue;
`;
const Header = styled.div`
  background-color: red;
  margin: 20px 0px;
  height: 50px;
`;
const Content = styled.div`
  background-color: gray;
  width: 100%;
  height: 100vh;
`;
const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Header>
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        ></button>
      </Header>
      <MenuBar isopen={isOpen}></MenuBar>
      <Content />
    </Container>
  );
};

export default Test;
