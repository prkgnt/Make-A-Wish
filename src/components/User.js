import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import app from "../firebase";

const Container = styled.div`
  flex: 1;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  padding: 10px 100px;
  flex-direction: column;
  background-color: aliceblue;
`;
const MessageArea = styled.input`
  width: 200;
  height: 300;
`;

const User = () => {
  const [checking, setChecking] = useState(true);
  const [availableLink, setAvailableLink] = useState(false);
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [content, setContent] = useState("");
  const db = getFirestore(app);
  const params = useParams();
  const linkId = params.linkId;

  const checkId = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));
    querySnapshot.forEach((doc) => {
      if (linkId === doc.data().linkId) {
        setUserId(doc.data().userId);
        setAvailableLink(true);
      } else {
        setAvailableLink(false);
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
      <Form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          placeholder="your name"
          maxLength="20"
          onChange={onChange}
          required
        />
        <textarea
          cols="50"
          rows="10"
          name="message"
          placeholder="write your message"
          maxLength="150"
          onChange={onChange}
          required
        />
        <input type="submit" value="Send" />
      </Form>
    </Container>
  ) : (
    <Container>Not Exist</Container>
  );
};

export default User;
