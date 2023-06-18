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
import tableImg from "../images/Group 2.png";
import candleImg from "../images/candle6.png";
import candleImg2 from "../images/candle5.png";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import background from "../images/iPhone 13 mini - 1.png";

SwiperCore.use([Pagination]);

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const MainPanel = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) =>
    props.isopen || props.openmsg ? "#262020" : "#403A3A"};
  transition: background-color 0.3s ease;
`;
const MenuBar = styled.div`
  position: absolute;
  z-index: 2;
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
  opacity: ${(props) => (props.isopen ? 0.5 : 1)};
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  height: 60px;
  text-align: center;
  border-bottom: 1px solid black;
  opacity: ${(props) => (props.isopen || props.openmsg ? 0.5 : 1)};
`;
const Text = styled.p`
  font-family: SingleDays;
  font-size: 25px;
  margin: auto 0;
  font-weight: 400;
  white-space: pre-wrap;
  color: white;
`;
const TextBtn = styled(Text)`
  background-color: #ffb800;
  color: black;
  padding: 5px 15px;
  border-radius: 15px;
  opacity: ${(props) => (props.openmsg ? 0.5 : 1)};
  &:active {
    opacity: 0.5;
  }
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  align-items: center;
  transform: translate(0px, 20px);
`;
const CakeImg = styled.img`
  &:active {
    opacity: 0.8;
  }
`;
const MessageBox = styled.div`
  margin-top: 70px;
  padding: 15px 15px;
  width: 300px;
  height: 350px;
  text-align: center;
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
  const [leftDay, setLeftDay] = useState(100);

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
      alert("이미 링크가 존재합니다!");
    } else {
      const docRef = await addDoc(collection(db, "availableID"), {
        userId: userObj.uid,
        linkId: v4,
        userName: userObj.displayName,
      });
      setLinkId(v4);
      alert("링크 생성을 완료했어요!");
      setIsUserLink(true);
    }
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
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const strBirth = birthDay.split("-");

    if (month == strBirth[1] && date == strBirth[2]) {
      setIsBirthDay(true);
    } else if (month == strBirth[1] && date < strBirth[2]) {
      setLeftDay(strBirth[2] - date);
    } else {
      setLeftDay(100);
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
      <Circle1></Circle1>
      <Circle2></Circle2>
      <MainPanel isopen={isOpen} openmsg={openMsg} background={background}>
        <Header isopen={isOpen} openmsg={openMsg}>
          <div style={{ width: 24, marginLeft: "15px" }} />
          <Text>소원을 말해봐</Text>
          <FaBars
            size={24}
            color="white"
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
                    color: "black",
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
                style={{
                  height: "400px",
                  width: "200px",
                  textAlign: "center",
                }}
              >
                <TextBtn
                  style={{
                    padding: "20px 0px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                  onClick={() => {
                    signOut(auth);
                  }}
                >
                  로그아웃
                </TextBtn>
              </div>
            </>
          ) : null}
        </MenuBar>
        {openMsg && isBirthDay ? (
          <Swiper
            style={{
              width: "300px",
              height: "400px",
              position: "absolute",
              margin: "30px 0px",
              left: "50%",
              transform: "translate(-50%)",
              backgroundColor: "white",
              borderRadius: "15px",
              outline: "5px dotted #a3885f",
              outlineOffset: "-10px",
            }}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <AiOutlineClose
              size={24}
              style={{
                position: "fixed",
                right: "15px",
                top: "20px",
                zIndex: "99",
              }}
              onClick={() => {
                setOpenMsg((prev) => !prev);
              }}
            />
            {contents &&
              contents.map((data, index) => (
                <SwiperSlide key={index}>
                  <MessageBox>
                    <Text style={{ color: "black" }}>{data.content}</Text>
                    <Text
                      style={{
                        transform: "translate(70px,210px)",
                        color: "black",
                      }}
                    >
                      {" "}
                      by {data.name}
                    </Text>
                  </MessageBox>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : null}
        <ContentBox isopen={isOpen}>
          <div style={{ textAlign: "left" }}>
            <Text>{userObj.displayName} 님의 케이크에</Text>
            <Text>지금까지 {length}개의 초가 밝혀졌어요!</Text>
          </div>
          <ImageBox style={{ opacity: isOpen || openMsg ? 0.6 : 1 }}>
            <CakeImg
              onClick={() => {
                if (!isBirthDay) {
                  alert(
                    `아직 생일이 ${
                      leftDay == 100 ? "많이" : `${leftDay}일`
                    } 남았어요!`
                  );
                } else {
                  setOpenMsg((prev) => !prev);
                }
              }}
              src={cakeImg}
              style={{
                zIndex: 1,
                height: "300px",
                width: "300px",
              }}
            />
            <img
              src={tableImg}
              style={{
                transform: "translate(0,-20px)",
                width: "355px",
                height: "200px",
              }}
            />
            <div style={{ zIndex: 1 }}>
              <img
                src={candleImg}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 0 ? 1 : 0,
                  transform: "translate(70px, -510px)",
                }}
              />
              <img
                src={candleImg2}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 1 ? 1 : 0,
                  transform: "translate(80px, -510px)",
                }}
              />
              <img
                src={candleImg}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 2 ? 1 : 0,
                  transform: "translate(90px, -510px)",
                }}
              />
              <img
                src={candleImg2}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 3 ? 1 : 0,
                  transform: "translate(-100px, -430px)",
                }}
              />
              <img
                src={candleImg}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 4 ? 1 : 0,
                  transform: "translate(-90px, -430px)",
                }}
              />
              <img
                src={candleImg2}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 5 ? 1 : 0,
                  transform: "translate(-80px, -430px)",
                }}
              />
              <img
                src={candleImg}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 6 ? 1 : 0,
                  transform: "translate(-70px, -430px)",
                }}
              />
              <img
                src={candleImg2}
                style={{
                  width: "40px",
                  height: "100px",
                  opacity: length > 7 ? 1 : 0,
                  transform: "translate(100px, -530px)",
                }}
              />
            </div>
          </ImageBox>
          {isUserLink ? (
            <CopyToClipboard
              style={{ zIndex: 1, transform: "translate(0px,-40px)" }}
              text={`https://prkgnt.github.io/Make-A-Wish/#/user/${linkId}`}
              onCopy={() => {
                alert("복사완료!");
              }}
            >
              <TextBtn openmsg={openMsg}>링크 복사하기!</TextBtn>
            </CopyToClipboard>
          ) : (
            <TextBtn
              openmsg={openMsg}
              style={{ zIndex: 1, transform: "translate(0px,-40px)" }}
              onClick={makeLink}
            >
              링크 생성하기!
            </TextBtn>
          )}
        </ContentBox>
      </MainPanel>
    </Container>
  );
};

export default Home;
