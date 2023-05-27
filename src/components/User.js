import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import app from "../firebase";

const Container = styled.div``;

const User = () => {
  const [checking, setChecking] = useState(true);
  const [availableLink, setAvailableLink] = useState(false);
  const db = getFirestore(app);
  const params = useParams();
  const linkId = params.linkId;

  const checkId = async () => {
    const querySnapshot = await getDocs(collection(db, "availableID"));

    querySnapshot.forEach((doc) => {
      if (linkId === doc.data().linkId) {
        setAvailableLink(true);
      } else {
        setAvailableLink(false);
      }
    });
  };

  useEffect(() => {
    checkId();
    setChecking(false);
  }, []);

  return checking ? (
    <div>checking..</div>
  ) : availableLink ? (
    <Container>Avaliable User</Container>
  ) : (
    <Container>Not Exist</Container>
  );
};

export default User;
