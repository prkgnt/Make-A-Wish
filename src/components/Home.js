import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../firebase";

const Container = styled.div``;

const Home = ({ userObj }) => {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [isUserLink, setIsUserLink] = useState(false);

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

  useEffect(() => {
    checkUserLink();
    setLoading(false);
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Container>
      <button onClick={makeLink}>make link</button>
    </Container>
  );
};

export default Home;
