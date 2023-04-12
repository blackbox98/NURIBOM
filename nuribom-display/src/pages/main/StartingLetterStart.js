import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import CurrectLoading from "../sideComponents/CurrectLoading";
import { LoadingBg, LetterAni } from "./styled";

const LetterText = styled.div`
  font-size: 15rem;
  font-weight: bold;
`;

const StartingLetterStart = () => {
  const navigate = useNavigate();
  const lettergive = new Audio(
    require("./bbomi_comment/letterstart.mp3")
  );
  lettergive.play();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      navigate("/letter");
    }, 6000);
  }, []);

  return (
    <>
      {loading ? (
        <CurrectLoading />
      ) : (
        <LoadingBg>
          <LetterAni 
          style={{
            borderRadius: "30px", 
            width: "65rem",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.07)"
            }} 
            src={require("../main/assets/letterexample.png")}></LetterAni>
        </LoadingBg>
      )}
    </>
  );
};

export default StartingLetterStart;
