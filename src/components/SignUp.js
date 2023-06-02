import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  text-align: center;
  flex-direction: column;
`;
const Text = styled.p`
  margin: auto 0;
  font-weight: 600;
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

const Auth = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDay, setBirthDay] = useState("");

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
    if (name === "nickname") {
      setNickName(value);
    }
    if (name === "birthday") {
      setBirthDay(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: nickName,
        });
        addDoc(collection(db, "birthDay"), {
          userId: userCredential.user.uid,
          birthDay: birthDay,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Header>
        <FaArrowLeft
          size={24}
          style={{ margin: "auto 0" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Text>회원가입</Text>
        <div style={{ width: 24 }} />
      </Header>
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
        <Input
          name="nickname"
          type="text"
          placeholder="nickname"
          required
          value={nickName}
          onChange={onChange}
        />
        <Input
          name="birthday"
          type="date"
          placeholder="birthday"
          required
          value={birthDay}
          onChange={onChange}
        />
        <SubmitBtn type="submit" value="회원가입" />
      </Form>
    </Container>
  );
};

export default Auth;
