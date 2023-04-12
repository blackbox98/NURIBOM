import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import CurrectLoading from "./../sideComponents/CurrectLoading";
import NotCurrectLoading from "./../sideComponents/NotCurrectLoading";

const LetterText = styled.div`
  font-size: 15rem;
  font-weight: bold;
`;

const StartingLetter = () => {
  const navigate = useNavigate();
  // const [gamedataID, setData] = useState(0);
  const gamedatum = ["ㅋㄲㄹ", "ㅌㄲ", "ㄷㅈ", "ㅎㄹㅇ", "ㄷㄹㅈ"];
  const answer = ["코끼리", "토끼", "돼지", "호랑이", "다람쥐"];
  const [input, setInput] = useState();
  // const [falseCnt, setFalseCnt] = useState(0);
  const falseCntRef = useRef(0);
  const gamedataIDRef = useRef(0);
  const scoreRef = useRef(0);
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [falseLoading, setFalseLoading] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const socketIO = io("http://127.0.0.1:9999");
    socketIO.on("message", function (msg) {
      console.log(msg);
      // console.log(gamedataID);
      if (gamedataIDRef.current == 5) {
        setLoading(true);
        gamedataIDRef.current = 0;
        falseCntRef.current = 0;
        setTimeout(() => {
          setLoading(false);
          navigate("/letterscore", { state: scoreRef.current });
        }, 2000);
      } else if (msg.message == "home") {
        socketIO.disconnect();
        navigate("/main");
      } else if (
        msg.message.includes("picture") ||
        msg.message.includes("video")
      ) {
        socketIO.disconnect();
        navigate("/download", { state: msg.message });
      } 
      else if (msg.message == "music") {
        socketIO.disconnect();
        navigate("/music");
      } 
       else if (msg.message == "emergency") {
        socketIO.disconnect();
        navigate("/emergency");
      } else {
        if (msg.message == "O") {
          console.log("마장");
          console.log("keyword" + answer[gamedataIDRef.current]);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);

          // setScore((prev) => score + 20);
          scoreRef.current += 20;
          // setData((prev) => gamedataID + 1);
          gamedataIDRef.current += 1;
          falseCntRef.current = 0;
          if (gamedataIDRef.current == 5) {
            gamedataIDRef.current = 0;
            falseCntRef.current = 0;
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigate("/letterscore", { state: scoreRef.current });
            }, 2000);
          }
          //   console.log(gamedataID);
          setInput(msg.message);
        } else {
          if (falseCntRef.current < 2) {
            console.log("틀렸어요.");

            // setFalseCnt((prev) => {
            //   return falseCnt + 1;
            // });
            setFalseLoading(true);
            setTimeout(() => {
              setFalseLoading(false);
            }, 2000);
            falseCntRef.current += 1;

            console.log("falseCnt" + falseCntRef.current);
          } else {
            gamedataIDRef.current += 1;
            // setData((prev) => gamedataID + 1);
            // setFalseCnt((prev) => 0);
            falseCntRef.current = 0;
            if (gamedataIDRef.current == 5) {
              gamedataIDRef.current = 0;
              falseCntRef.current = 0;
              setFalseLoading(true);
              setTimeout(() => {
                setFalseLoading(false);
                navigate("/letterscore", { state: scoreRef.current });
              }, 2000);
            }
            setRound((prev) => gamedataIDRef.current);
          }
          // if (msg.message == input) {
          //   setInput("");
          // } else {
          //   setInput(msg.message);
          // }
        }
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <CurrectLoading />
      ) : falseLoading ? (
        <NotCurrectLoading />
      ) : (
        <div
          style={{
            backgroundImage: `url(${require(`./assets/startletter/letter${gamedataIDRef.current}.png`)})`,
            height: "100vh",
            width: "100vw",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LetterText>{gamedatum[gamedataIDRef.current]}</LetterText>
        </div>
      )}
    </>
  );
};

export default StartingLetter;
