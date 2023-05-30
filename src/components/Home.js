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
  const [contents, setContents] = useState();
  const checkUserLink = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));

    querySnapshot.forEach((doc) => {
      if (userObj.uid === doc.data().userId) {
        setIsUserLink(true);
      }
    });
  };

  const makeLink = async () => {
    if (isUserLink) {
      console.log("alreay exist");
    } else {
      const docRef = await addDoc(collection(db, "availableID"), {
        userId: userObj.uid,
        linkId: uuidv4(),
      });
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
    //console.log(queryArray);
    setContents(queryArray);
    //console.log(contents);
  };

  useEffect(() => {
    checkUserLink();
    getMessages();
    setLoading(false);
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Container>
      <button onClick={makeLink}>make link</button>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        LogOut
      </button>
      <div>
        {contents &&
          contents.map((data, index) => (
            <div key={index}>
              {data.name} / {data.content}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Home;
