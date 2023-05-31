import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import app from "../firebase";

const Container = styled.div``;

const Home = ({ userObj }) => {
  const auth = getAuth();
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [isUserLink, setIsUserLink] = useState(false);
  const [contents, setContents] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [isBirthDay, setIsBirthDay] = useState(false);

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
    <Container>
      <div>{userObj.displayName}</div>
      <div>{birthDay}</div>
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
