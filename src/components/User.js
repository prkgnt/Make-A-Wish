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
  text-align: center;
  background-color: #ffdda9;
`;
const Form = styled.form`
  width: 300px;
  height: 400px;
  padding: 10px 100px;
`;
const InputBox = styled.input`
  margin: 15px 15px;
  width: 150px;
  height: 30px;
  border: 0px;
  padding: 0px 10px;
  border-radius: 8px;
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
  width: 200px;
  height: 40px;
  border-radius: 30px;
  margin: 10px 10px;
  background-color: #fca311;
  border: 0px;
  font-weight: 700;
  transform: translate(50px, 0px);
`;
const Text = styled.p`
  font-family: SingleDays;
  font-size: 25px;
  margin: auto 0;
  padding: 15px 0px;
  font-weight: 400;
  white-space: pre-wrap;
`;

const User = ({ userObj }) => {
  const [checking, setChecking] = useState(true);
  const [availableLink, setAvailableLink] = useState(false);
  const [userId, setUserId] = useState("");
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
        setAvailableLink(true);
        console.log(availableLink);
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
      <Text>{userObj.displayName}님에게 메세지를 남겨주세요!</Text>
      <Form onSubmit={onSubmit}>
        <TextArea
          cols="50"
          rows="10"
          name="message"
          placeholder="여기에 메세지를 남겨주세요! (최대 150자.)"
          maxLength="150"
          onChange={onChange}
          required
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text>By. </Text>
          <InputBox
            name="name"
            type="text"
            placeholder="닉네임!"
            maxLength="20"
            onChange={onChange}
            required
          />
        </div>
        <Btn type="submit" value="Send" />
      </Form>
    </Container>
  ) : (
    <Container>Not Exist</Container>
  );
};

export default User;
