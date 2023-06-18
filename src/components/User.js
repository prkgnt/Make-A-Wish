import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import app from "../firebase";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background-color: #ffdda9;
  padding-top: 20px;
`;
const Form = styled.form`
  z-index: 1;
  width: 300px;
  height: 400px;
`;
const InputBox = styled.input`
  margin: 15px 15px;
  width: 150px;
  height: 30px;
  border: 0px;
  padding: 0px 10px;
  border-radius: 8px;
  transform: translate(25px, 0px);
`;
const TextArea = styled.textarea`
  padding: 20px 20px;
  width: 300px;
  height: 300px;
  outline: 5px dotted #a3885f;
  outline-offset: -13px;
  border-radius: 15px;
`;
const Btn = styled.input`
  font-family: SingleDays;
  font-size: 20px;
  width: 200px;
  height: 40px;
  border-radius: 30px;
  margin: 10px 10px;
  background-color: #fca311;
  border: 0px;
`;
const Text = styled.p`
  font-family: SingleDays;
  font-size: 25px;
  padding: 15px 0px;
  font-weight: 400;
  white-space: pre-wrap;
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
const User = () => {
  const [checking, setChecking] = useState(true);
  const [availableLink, setAvailableLink] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [content, setContent] = useState("");
  const db = getFirestore(app);
  const params = useParams();
  const linkId = params.linkId;
  const navigate = useNavigate();

  const checkId = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));
    querySnapshot.forEach((doc) => {
      if (linkId === doc.data().linkId) {
        console.log(linkId);
        setUserId(doc.data().userId);
        setUserName(doc.data().userName);
        setAvailableLink(true);
      } else {
        //setAvailableLink(false);
      }
    });
  };

  const onChange = (event) => {
    //event.target => 이벤트가 일어나는 타겟(객체) 의미
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setNickName(value);
    }
    if (name === "message") {
      setContent(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "messages"), {
      userId: userId,
      name: nickName,
      content: content,
    }).then(() => {
      alert("전송을 완료했어요!");
      navigate("/");
    });
  };

  useEffect(() => {
    checkId();
    setChecking(false);
  }, []);

  return checking ? (
    <div>checking..</div>
  ) : availableLink ? (
    <Container>
      <Circle1></Circle1>
      <Circle2></Circle2>
      <Text>{userName} 님에게 메세지를 남겨주세요!</Text>
      <Form onSubmit={onSubmit}>
        <TextArea
          cols="50"
          rows="10"
          name="message"
          placeholder="여기에 메세지를 남겨주세요! (최대 100자.)"
          maxLength="100"
          onChange={onChange}
          required
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ transform: "translate(25px, 0px)" }}>By. </Text>
          <InputBox
            name="name"
            type="text"
            placeholder="닉네임!"
            maxLength="20"
            onChange={onChange}
            required
          />
        </div>
        <Btn type="submit" value="메세지 전달" />
      </Form>
    </Container>
  ) : (
    <Container>Not Exist</Container>
  );
};

export default User;
