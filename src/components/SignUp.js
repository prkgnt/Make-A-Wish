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
  height: 100vh;
  background-color: #ffdda9;
  align-items: center;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  text-align: left;
  flex-direction: column;
`;
const Text = styled.p`
  font-family: SingleDays;
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
  font-family: SingleDays;
  color: black;
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
    if (!birthDay) {
      alert("생일을 입력해주세요!");
      return;
    }
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
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("이미 사용중인 이메일 주소에요!");
            break;
          case "auth/invalid-email":
            alert("형식에 맞게 이메일 주소를 입력해주세요!");
            break;
          case "auth/weak-password":
            alert("6자 이상의 비밀번호를 입력해주세요!");
            break;
          default:
            alert("알 수 없는 에러가 발생했어요! 잠시 후 다시 시도해주세요!");
        }
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
        <Text style={{ fontSize: "22px" }}>회원가입</Text>
        <div style={{ width: 24 }} />
      </Header>
      <Form onSubmit={onSubmit}>
        <Text style={{ marginLeft: "10px" }}>이메일 주소 입력</Text>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={onChange}
        />
        <Text style={{ marginLeft: "10px" }}>비밀번호 입력</Text>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Text style={{ marginLeft: "10px" }}>닉네임 입력</Text>
        <Input
          name="nickname"
          type="text"
          placeholder="nickname"
          required
          value={nickName}
          onChange={onChange}
        />
        <Text style={{ marginLeft: "10px" }}>생일 입력</Text>
        <Input
          name="birthday"
          type="date"
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
