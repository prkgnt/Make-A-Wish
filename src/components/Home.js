import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getAuth, signOut } from "firebase/auth";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import app from "../firebase";

const Container = styled.div`
  display: flex;
  height: 100vh;
  /* width: 300px;
  position: fixed;
  right: 50%;
  transform: translate(150px); */
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.isopen ? "gray" : "white")};
  transition: background-color 0.3s ease;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin: 20px 0px;
  width: 300px;
  height: 50px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const Text = styled.p`
  margin: auto 0;
  font-weight: 600;
  white-space: pre-wrap;
`;
const MenuBar = styled.div`
  //width: ${(props) => (props.isopen ? "500px" : "0px")};
  width: 500px;
  transition: transform 0.5s ease;
  //transition: width 0.5s ease;
  overflow: hidden;
  height: 100vh;
  background-color: white;
  position: fixed;
  right: 50%;
  top: 0;
  transform: translate(${(props) => (props.isopen ? "450px" : "650px")});
  //transform: translate(500px);
`;

const Home = ({ userObj }) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [isUserLink, setIsUserLink] = useState(false);
  const [contents, setContents] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isBirthDay, setIsBirthDay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const checkUserLink = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));
    querySnapshot.forEach((doc) => {
      if (userObj.uid === doc.data().userId) {
        setIsUserLink(true);
      }
    });
  };

  const makeLink = async () => {
    const v4 = uuidv4();
    if (isUserLink) {
      console.log("alreay exist");
    } else {
      const docRef = await addDoc(collection(db, "availableID"), {
        userId: userObj.uid,
        linkId: v4,
      });
    }
    console.log(`localhost:3000/user/${v4}`);
  };

  const getMessages = async () => {
    const messagesRef = await collection(db, "messages");
    const q = await query(messagesRef, where("userId", "==", userObj.uid));
    const querySnapshot = await getDocs(q);

    const queryArray = [];
    querySnapshot.forEach((doc) => {
      queryArray.push(doc.data());
    });

    setContents(queryArray);
  };

  const getBirthDay = async () => {
    const birthDayRef = await collection(db, "birthDay");
    const q = await query(birthDayRef, where("userId", "==", userObj.uid));
    const querySnapshot = await getDocs(q);
    setBirthDay(querySnapshot.docs[0].data().birthDay);
  };

  useEffect(() => {
    // const month = new Date().getMonth();
    // const date = new Date().getDate();
    const month = 6;
    const date = 27;
    const newBirth = birthDay.split("-");
    if (month == newBirth[1] && date == newBirth[2]) {
      setIsBirthDay(true);
    }
  }, [birthDay]);

  useEffect(() => {
    checkUserLink();
    getMessages();
    getBirthDay();

    setLoading(false);
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Container isopen={isOpen}>
      <Header>
        <div style={{ width: 24 }} />
        <Text>소원을 말해봐</Text>
        <FaBars
          size={24}
          style={{ margin: "auto 0" }}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        />
      </Header>

      <MenuBar isopen={isOpen}>
        {isOpen ? (
          <>
            <AiOutlineClose
              size={24}
              style={{ position: "fixed", right: "310px", top: "20px" }}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            />
            <div
              style={{
                height: "150px",
                width: "180px",
                margin: "0px 15px",
                borderBottom: "1px solid black",
              }}
            >
              <FaUserCircle
                size={55}
                style={{
                  position: "fixed",
                  top: "70px",
                  left: "15px",
                }}
              />
              <Text style={{ position: "fixed", top: "72px", right: "315px" }}>
                {userObj.displayName}
                {"\n"}
                {birthDay}
              </Text>
            </div>
          </>
        ) : null}
      </MenuBar>

      <button onClick={makeLink}>make link</button>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        LogOut
      </button>
      {isBirthDay ? (
        <div>
          {contents &&
            contents.map((data, index) => (
              <div key={index}>
                {data.name} / {data.content}
              </div>
            ))}
        </div>
      ) : (
        <div>not yet</div>
      )}
    </Container>
  );
};

export default Home;
