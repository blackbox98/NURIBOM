import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import LoadingSpinner from "../sideComponents/LoadingSpinner";
import { LoadingBg } from "./styled";

const LetterText = styled.div`
  font-size: 5rem;
  font-weight: bold;
  color: orange;
`;

const Emergency = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const socketIO = io("http://127.0.0.1:9999");
    socketIO.on("message", function (msg) {
      if (msg.message == "home") {
        navigate("/main");
      } else {
        console.log("잘못입력 모셈 !!!!!!!!!!");
      }
    });
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/main");
  //   }, 5000);
  // }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
          <div 
          style={{ 
              height: "100vh", 
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <div>
              <div>
                <img src={"https://content.presentermedia.com/content/animsp/00013000/13449/cylinder_siren_anim_300_wht.gif"} />
              </div>
              <LetterText>지금 즉시 보호자분께</LetterText>
              <LetterText>응급상황 연락을 보냅니다.</LetterText>
            </div>
          </div>
      )}
    </>
  );
};


export default Emergency;