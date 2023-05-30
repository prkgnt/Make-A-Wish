import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase";
const Container = styled.div``;
const Input = styled.input``;
const SubmitBtn = styled.input``;

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
        <SubmitBtn type="submit" value="Create New Account" />
      </form>
    </Container>
  );
};

export default Auth;
