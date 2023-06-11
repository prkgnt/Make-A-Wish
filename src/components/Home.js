import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getAuth, signOut } from "firebase/auth";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import app from "../firebase";
import cakeImg from "../images/cakeImg.png";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const MainPanel = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => (props.isopen ? "gray" : "white")};
  transition: background-color 0.3s ease;
`;
const MenuBar = styled.div`
  position: absolute;
  right: -200px;
  top: 0;
  width: ${(props) => (props.isopen ? "200px" : "0px")};
  height: 100vh;
  background-color: white;
  transition: transform 0.5s ease;
  transform: translate(${(props) => (props.isopen ? "-200px" : "0px")});
`;
const ContentBox = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  height: 60px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const Text = styled.p`
  font-family: SingleDays;
  font-size: 25px;
  margin: auto 0;
  font-weight: 600;
  white-space: pre-wrap;
`;
const ImageBox = styled.div`
  display: flex;
  width: 300px;
  height: 500px;
  align-items: center;
`;
const MessagePanel = styled.div`
  position: absolute;
  margin: 30px 0px;
  left: 50%;
  transform: translate(-50%);
`;
const MessageBox = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  background-color: gray;
`;
const Home = ({ userObj }) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const [linkId, setLinkId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUserLink, setIsUserLink] = useState(false);
  const [contents, setContents] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isBirthDay, setIsBirthDay] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [length, setLength] = useState(0);
  const [openMsg, setOpenMsg] = useState(false);

  const checkUserLink = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));
    querySnapshot.forEach((doc) => {
      if (userObj.uid === doc.data().userId) {
        setIsUserLink(true);
        setLinkId(doc.data().linkId);
      }
    });
  };

  const makeLink = async () => {
    const v4 = uuidv4();
    if (isUserLink) {
      alert("alreay exist");
    } else {
      const docRef = await addDoc(collection(db, "availableID"), {
        userId: userObj.uid,
        linkId: v4,
      });
      setLinkId(v4);
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
    setLength(queryArray.length);
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
    <Container>
      <MainPanel isopen={isOpen}>
        <Header>
          <div style={{ width: 24, marginLeft: "15px" }} />
          <Text>소원을 말해봐</Text>
          <FaBars
            size={24}
            style={{ margin: "auto 15" }}
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
                style={{ position: "fixed", right: "15px", top: "20px" }}
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              />
              <div
                style={{
                  height: "150px",
                  width: "180px",
                  margin: "0px 10px",
                  borderBottom: "1px solid black",
                }}
              >
                <FaUserCircle
                  size={55}
                  style={{
                    position: "fixed",
                    top: "70px",
                  }}
                />
                <Text
                  style={{
                    fontSize: "20px",
                    position: "fixed",
                    top: "72px",
                    right: "20px",
                  }}
                >
                  {userObj.displayName}
                  {"\n"}
                  {birthDay}
                </Text>
              </div>
              <div
                style={{ height: "400px", width: "200px", textAlign: "center" }}
              >
                <Text
                  style={{ padding: "10px 0px" }}
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  로그아웃
                </Text>
              </div>
            </>
          ) : null}
        </MenuBar>
        {openMsg ? (
          <MessagePanel>
            <MessageBox>
              <AiOutlineClose
                size={24}
                style={{ position: "fixed", right: "15px", top: "20px" }}
                onClick={() => {
                  setOpenMsg((prev) => !prev);
                }}
              />
            </MessageBox>
          </MessagePanel>
        ) : null}

        <ContentBox>
          <div style={{ textAlign: "left" }}>
            <Text>{userObj.displayName} 님의 케이크에</Text>
            <Text>지금까지 {length}개의 초가 밝혀졌어요!</Text>
          </div>
          <ImageBox>
            <img
              src={cakeImg}
              style={{
                height: "300px",
                width: "300px",
              }}
            />
          </ImageBox>
          {isUserLink ? (
            <CopyToClipboard
              text={`localhost:3000/user/${linkId}`}
              onCopy={() => {
                alert("복사완료!");
              }}
            >
              <Text>링크 복사하기</Text>
            </CopyToClipboard>
          ) : (
            <button onClick={makeLink}>
              <Text>링크 공유하기</Text>
            </button>
          )}
          {isBirthDay ? (
            <button
              onClick={() => {
                setOpenMsg((prev) => !prev);
              }}
            >
              {/* {contents &&
                contents.map((data, index) => (
                  <div key={index}>
                    {data.name} / {data.content}
                  </div>
                ))} */}
              메세지 확인하기
            </button>
          ) : (
            <div>not yet</div>
          )}
        </ContentBox>
      </MainPanel>
    </Container>
  );
};

export default Home;
