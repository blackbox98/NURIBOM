import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import { LoadingBg } from "../main/styled";
import CurrectLoading from "./CurrectLoading";

const LetterText = styled.div`
  font-size: 10rem;
  font-weight: bold;
`;

const LetterScore = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 3000);
  }, []);
  return (
    <>
      <LoadingBg>
        <LetterText>점수 : {state}</LetterText>
      </LoadingBg>
    </>
  );
};

export default LetterScore;
