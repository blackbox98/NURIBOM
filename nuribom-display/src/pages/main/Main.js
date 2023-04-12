import React from "react";
import styled, { keyframes } from "styled-components";
import {
  MainBackground,
  MainBackgroundInner,
  MainTileWrap,
  MainTileWrapInner,
  CommonTileForm,
  MainBubble
} from "./styled";
import { useEffect, useCallback, useState } from "react";
import { getWeather } from "../../api/weatherAPI";

import io from "socket.io-client";

import { useDispatch } from "react-redux";
import { getUser } from "../../api/userAPI";
import { storeUserRegist } from "../../store/reducers/user";
import LoadingSpinner from "../sideComponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { getStorage, listAll, ref } from "firebase/storage";

// 오늘날짜 계산하는 함수
function numFormat(variable) {
  variable = Number(variable).toString();
  if (Number(variable) < 10 && variable.length == 1) variable = "0" + variable;
  return variable;
}
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let dString = year.toString() + month.toString() + numFormat(day).toString();

const ChMove = keyframes`
    0%, 20%{
        transform:translate(0%, 50%);
    }
    100%{
        transform:translate(0%, 0%);
    }
`;
const StretchDiv = styled.div`
  animation: ${ChMove} 0.5s linear;
`;
const SongDiv = styled.div`
  animation: ${ChMove} 0.8s linear;
`;
const GameDiv = styled.div`
  animation: ${ChMove} 1.1s linear;
`;
const PhotoDiv = styled.div`
  animation: ${ChMove} 1.4s linear;
`;
const MessageDiv = styled.div`
  animation: ${ChMove} 1.7s linear;
`;

import lettergif from "./assets/letter.gif";
import weatherpic from "./assets/weatherpic.PNG";
import fine from "./assets/fine.gif";
import cloud from "./assets/cloud.gif";
import suncloud from "./assets/suncloud.gif";
import rain from "./assets/rain.gif";
import hello from "./assets/hello.gif";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mainview, setMainView] = useState(0);
  const [bubble, setBubble] = useState(1);
  const [newmem, setNewMem] = useState(0);
  const storage = getStorage();
  const user = localStorage.getItem("UserSerial");
  const listRef = ref(storage, `video_${user}`);
  // const listRef = ref(storage);
  const mainviewpic = [
    weatherpic,
    fine,
    lettergif,
    suncloud,
    cloud,
    rain,
    hello,
  ];

  const fetchPhotos = async () => {
    try {
      setLoading(true); //로딩시작
      const videocnt = localStorage.getItem("VideoCnt");
      await listAll(listRef)
        .then((res) => {
          console.log("이거 비디오갯수",videocnt , res.items[0]);
          if (videocnt >= res.items.length) { console.log("똑같ㄷ애 보여줄거 없어"); } 
          else { console.log("새로운 비디오가 잇읍니다"); setNewMem(1)}
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      setError(e); //에러가 발생한 경우
    }
    setLoading(false); //로딩이 끝났다는 것을 확인
  };

  const getUserData = useCallback(async () => {
    const response = await getUser("nuri05050509");
    dispatch(storeUserRegist({ data: response }));
    console.log(response);
    const medication = response.medicationResponses;
    console.log(medication);
    localStorage.setItem("MEDICATION", JSON.stringify(medication));
    localStorage.setItem("UserSerial", response.serialNo);
  });

  useEffect(() => {
    setTimeout(() => {setBubble(0)}, 7000)
    setLoading(true);
    getUserData();
    fetchPhotos();
    setLoading(false);
    const getWeatherAPI = async () => {
      const response = await getWeather(dString);
      console.log(response.responses);
      if (response.responses[1].fcstValue >= 80) {
        setMainView(5);
      } else {
        setMainView(response.responses[0].fcstValue);
        sessionStorage.setItem("weather", response.responses[0].fcstValue)
      }
    };
    getWeatherAPI();
  }, []);

  useEffect(() => {
    const socketIO = io("http://127.0.0.1:9999");
    socketIO.on("message", function (msg) {
      if (msg.message == "stretching") {
        navigate("/stretch");
      } else if (msg.message == "music") {
        navigate("/music");
      } else if (msg.message == "game") {
        navigate("/letterstart");
      } else if (msg.message == "home") {
        navigate("/main");
      } else if (msg.message == "emergency") {
        navigate("/emergency");
      } else if (
        msg.message.includes("picture") ||
        msg.message.includes("video")
      ) {
        navigate("/download", { state: msg.message });
      } else if (msg.message == "call") {
        setMainView(6);
      } else if (msg.message == "bg") { 
        localStorage.clear("BgImg")
        navigate("/");
      }
      else {
        console.log("잘못입력 모셈 !!!!!!!!!!");
      }
    });
  }, []);

  if (localStorage.getItem("BgImg") == null) {
    return (
      <>
        <>
          {newmem == 1 ? (
            <MainBubble style={{ 
              position: "absolute", 
              width: "10vw", 
              marginBottom: "3vh",
              top: "450px",
              right: "500px"
              }} 
              src={require("../main/assets/bubble/newletter.png")}></MainBubble>
          ) : (<></>)}
        </>
        <>
        {bubble == 1 ? (
          <MainBubble style={{ 
            position: "absolute", 
            width: "20vw", 
            marginBottom: "3vh",
            top: "50px",
            right: "75px"
            }} 
            src={require("../main/assets/bubble/main1.png")}></MainBubble>
        ) : (<></>)}
        </>
        <img
          style={{ 
            position: "absolute", 
            width: "20vw", 
            marginBottom: "3vh",
            bottom: "0",
            right: "0"
            }}
          src={mainviewpic[6]}
        ></img>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MainBackground>
            <MainBackgroundInner>
              <MainTileWrap>
                <div>
                  <MainTileWrapInner>
                    <StretchDiv>
                      <CommonTileForm
                        src={require("./assets/stretch_tile.png")}
                      ></CommonTileForm>
                    </StretchDiv>
                    <SongDiv>
                      <CommonTileForm
                        src={require("./assets/song_tile.png")}
                      ></CommonTileForm>
                    </SongDiv>
                    <GameDiv>
                      <CommonTileForm
                        src={require("./assets/game_tile.png")}
                      ></CommonTileForm>
                    </GameDiv>
                    <PhotoDiv>
                      <CommonTileForm
                        src={require("./assets/photo_tile.png")}
                      ></CommonTileForm>
                    </PhotoDiv>
                    <MessageDiv>
                      <CommonTileForm
                        src={require("./assets/letter_tile.png")}
                      ></CommonTileForm>
                    </MessageDiv>
                  </MainTileWrapInner>
                </div>
                <div>
                  <div
                    style={{
                      width: "40vw",
                      height: "70vh",
                      color: "white",
                      // background: "pink"
                    }}
                  >
                    <img
                      style={{ width: "15vw", marginBottom: "3vh", opacity: "0.8" }}
                      src={mainviewpic[mainview]}
                    ></img>
                  </div>
                </div>
              </MainTileWrap>
            </MainBackgroundInner>
          </MainBackground>
        )}
      </>
    );
  } else {
    console.log(localStorage.getItem("BgImg"));
    return (
      <>
        <>
          {newmem == 1 ? (
            <MainBubble style={{ 
              position: "absolute", 
              width: "10vw", 
              marginBottom: "3vh",
              top: "450px",
              right: "500px"
              }} 
              src={require("../main/assets/bubble/newletter.png")}></MainBubble>
          ) : (<></>)}
        </>
        <>
          {bubble == 1 ? (
            <MainBubble style={{ 
              position: "absolute", 
              width: "20vw", 
              marginBottom: "3vh",
              top: "50px",
              right: "75px"
              }} 
              src={require("../main/assets/bubble/main1.png")}></MainBubble>
          ) : (<></>)}
        </>
        <img
          style={{ 
            position: "absolute", 
            width: "30vw", 
            marginBottom: "3vh",
            bottom: "0",
            right: "0"
            }}
          src={mainviewpic[6]}
        ></img>
                    
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div
            style={{
              backgroundImage: `url(${localStorage.getItem("BgImg")})`,
              height: "100vh",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              overflow: "hidden",
              display: "flex",
              alignItems: "end",
            }}
          >
            <MainBackgroundInner>
              <MainTileWrap>
                <div>
                  <MainTileWrapInner>
                    <StretchDiv>
                      <CommonTileForm
                        src={require("./assets/stretch_tile.png")}
                      ></CommonTileForm>
                    </StretchDiv>
                    <SongDiv>
                      <CommonTileForm
                        src={require("./assets/song_tile.png")}
                      ></CommonTileForm>
                    </SongDiv>
                    <GameDiv>
                      <CommonTileForm
                        src={require("./assets/game_tile.png")}
                      ></CommonTileForm>
                    </GameDiv>
                    <PhotoDiv>
                      <CommonTileForm
                        src={require("./assets/photo_tile.png")}
                      ></CommonTileForm>
                    </PhotoDiv>
                    <MessageDiv>
                      <CommonTileForm
                        src={require("./assets/letter_tile.png")}
                      ></CommonTileForm>
                    </MessageDiv>
                  </MainTileWrapInner>
                </div>
                <div>
                  <div
                    style={{
                      width: "40vw",
                      height: "70vh",
                      color: "white",
                      // background: "pink"
                    }}
                  >
                    <img
                      style={{ width: "15vw", marginBottom: "3vh", opacity: "0.8"}}
                      src={mainviewpic[mainview]}
                    ></img>
                  </div>
                </div>
              </MainTileWrap>
            </MainBackgroundInner>
          </div>
        )}
      </>
    );
  }
};

export default Main;
