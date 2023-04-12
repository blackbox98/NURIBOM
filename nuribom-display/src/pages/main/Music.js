import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingBg } from "./styled";
import io from "socket.io-client";
const Music = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const music = new Audio(require("./bbomi_comment/musicques.mp3"));
    // setTimeout(function () {
    //   music.play();
    //   console.log(music.duration);
    // }, 1000);
    const socketIO = io("http://127.0.0.1:9999");
    socketIO.on("message", function (msg) {
      console.log("??", msg);
      if (msg.message == "home") {
        socketIO.disconnect();
        navigate("/main");
      }
      if (msg.message == "stretching") {
        socketIO.disconnect();
        navigate("/");
      } else if (msg.message == "music") {
        socketIO.disconnect();
        navigate("/music");
      } else if (msg.message == "game") {
        socketIO.disconnect();
        navigate("/letterstart");
      } else if (msg.message == "home") {
        socketIO.disconnect();
        navigate("/main");
      } else if (
        msg.message.includes("picture") ||
        msg.message.includes("video")
      ) {
        socketIO.disconnect();
        navigate("/download", { state: msg.message });
      } else if (msg.message == "emergency") {
        navigate("/emergency");
      } else {
        console.log("여기왜감");
        navigate(`/musicresult`, { state: msg.message });
      }
    });
  }, []);

  return (
    <LoadingBg>
      <div>
        <div>
          <img src={require("./assets/music.png")}></img>
        </div>
        <div>
          <img
            style={{ width: "30vw" }}
            src={require("../main/assets/musicloading.gif")}
          ></img>
        </div>
      </div>
    </LoadingBg>
  );
};

export default Music;
