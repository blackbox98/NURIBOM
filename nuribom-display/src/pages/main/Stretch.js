import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";
import { 
  Background,
   NuriBomLogoImage,
   LoadingBg,
   MainBubble
  } from "./styled";
import io from "socket.io-client";
import ReactPlayer from "react-player";

const Stretch = () => {
  const navigate = useNavigate();
  // const music = new Audio(require("./bbomi_comment/musicques.mp3"));
  const [socket, setSocket] = useState();
  // const ref = useRef < HTMLVideoElement > null;
  // setTimeout(function () {
  //   music.play();
  //   console.log(music.duration);
  // }, 1000);
  const [playIndex, setPlayIndex] = useState(0);
  const playList = [
    {
      index: 1,
      url: "https://firebasestorage.googleapis.com/v0/b/nurinuri4-69628.appspot.com/o/stretching_arms.mp4?alt=media&token=b6a596a7-42e7-4901-8d84-6ed1e891133f",
    },
    {
      index: 2,
      url: "https://firebasestorage.googleapis.com/v0/b/nurinuri4-69628.appspot.com/o/stretching_arms.mp4?alt=media&token=b6a596a7-42e7-4901-8d84-6ed1e891133f",
    },
  ];
  const handleNextVideo = (video, playIndex) => {
    if (playIndex === video.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };
  const selectVideo = (index) => {
    setPlayIndex(index);
  };
  if (playList === null) return <p>Loading...</p>;
  useEffect(() => {
    const socketIO = io("http://127.0.0.1:9999");
    socketIO.send("stretch");
    socketIO.on("message", function (msg) {
      console.log(msg);
      if (msg.message == "home") {
        navigate("/main");
      } else if (msg.message == "emergency") {
        navigate("/emergency");
      } else {
        // navigate("/stretch");
      }
    });
    setSocket(socketIO);
  }, []);
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);
  return (
    <>
    <MainBubble
      style={{ 
        position: "absolute", 
        width: "15vw", 
        marginBottom: "3vh",
        top: "50px",
        left: "270px"
        }} 
     src={require("../main/assets/bubble/stretch1.png")}></MainBubble>
      <LoadingBg>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50vw",
              height: "100vh",
              fontWeight: "bold",

              fontSize: "50px",
            }}
          >
            {/* <video
              width={"100%"}
              height={"100%"}
              autoPlay={true}
              loop={true}
              playsInline={true}
            >
              <source
                src={require("./assets/samplevideo/샘플영상.mp4")}
                type="video/mp4"
              />
            </video> */}
            <ReactPlayer
              // url={playList[playIndex].url}
              url={
                "https://firebasestorage.googleapis.com/v0/b/nurinuri4-69628.appspot.com/o/stretching_arms_AdobeExpress.mp4?alt=media&token=8e0beb04-fe97-49b5-ba84-478c854a6da1"
              }
              width={"100%"}
              height={"100%"}
              playing={true}
              muted={true}
              progressInterval={1000}
              onEnded={() => {
                handleNextVideo(playList, playIndex);
              }}
            ></ReactPlayer>
          </div>
          <div
            style={{
              width: "50vw",
              height: "100vh",

              fontWeight: "bold",
              fontSize: "50px",
            }}
          >
          </div>
          {/* <NuriBomLogoImage
            src={require("./assets/music.png")}
          ></NuriBomLogoImage> */}
        </div>
      </LoadingBg>
    </>
  );
};

export default Stretch;
