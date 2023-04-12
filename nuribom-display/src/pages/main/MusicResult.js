import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Background } from "./styled";

function MusicResult() {
  const navigate = useNavigate();
  //결과물, 1. 요청의 결과
  const [users, setUsers] = useState(null);
  // API가 요청 중인지 아닌지, 2. 로딩상태
  const [loading, setLoading] = useState(false);
  //error, 3. 에러
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL = "https://www.googleapis.com/youtube/v3/search";
        const config = {
          params: {
            key: process.env.REACT_APP_YTB_KEY_01,
            part: "snippet",
            type: "video",
            q: location.state,
            // q: '데이식스',
          },
        };
        setUsers(null);
        setError(null);
        setLoading(true); //로딩시작
        const response = await axios.get(API_URL, config);
        setUsers(response.data.items); //데이터 받아오고 setUser에 담기
      } catch (e) {
        setError(e); //에러가 발생한 경우
      }
      setLoading(false); //로딩이 끝났다는 것을 확인
    };
    fetchUsers();

    const socketIO = io("http://127.0.0.1:9999");
    socketIO.on("message", function (msg) {
      console.log(msg);
      if (msg.message == "home") {
        navigate("/main");
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
        navigate("/musicresult", { state: msg.message });
      }
    });
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!users) return null;

  return (
    <>
      <Background>
        <div>
          <iframe
            style={{
              width: "100vw",
              height: "100vh",
            }}
            src={
              "https://www.youtube.com/embed/" +
              users[0].id.videoId +
              "?autoplay=1"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Background>
    </>
  );
}

export default MusicResult;
