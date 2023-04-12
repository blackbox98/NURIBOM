import React, {useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
    MediaListBg,
    VideoContainer,
    VideoContainerFocus,
    PictureContainerOuter,
    PictureOuter,
    PictureInner,
    StretchDiv
} from "./styled";

const ListVideo = () => {
    const refs = useRef([]);
    const navigate = useNavigate();
    const user = localStorage.getItem('UserSerial')
    const res = JSON.parse(sessionStorage.getItem(`video_${user}`))
    const [director, setDirector] = useState(res.length);
    const [bubble, setBubble] = useState(1);
    const [bubbleinfo, setBubbleInfo] = useState(0);
    const [socket, setSocket] = useState();
    const videocnt = localStorage.getItem("VideoCnt");

    useEffect(() => {
        const socketIO = io("http://127.0.0.1:9999");
        console.log("이거 비디오갯수", res.length);
        if(videocnt >= res.length) {
            socketIO.on("message", function (msg) {
                if (msg.message == "prev") {
                    if(director == res.length) { setDirector(1) }
                    else { setDirector(director+1) }
                    setBubble(0)
                    if (bubble == 2) { setBubble(0); setBubbleInfo(bubbleinfo+1) }
                    else if (bubbleinfo == 0 && bubble < 2) { setBubble(bubble + 1) }
                    console.log("dlrjdlrjdrjl", bubble)
                } 
                else if (msg.message == "next") {
                    if(director == 1) { setDirector(res.length) }
                    else { setDirector(director-1) }
                    setBubble(0)
                    if (bubble == 2) { setBubble(0); setBubbleInfo(bubbleinfo+1)}
                    else if (bubbleinfo == 0 && bubble < 2) { setBubble(bubble + 1) }
                    console.log("dlrjdlrjdrjl", bubble)
                } 
                else if (msg.message == "home") { navigate("/main"); } 
                else if (msg.message == "this") { 
                    console.log("이거이거요", res[director-1].id)
                    navigate(`/viewvideo`, {state: `${res.reverse()[director-1].id-1}`})
                }
                else { console.log("잘못입력") }
            });
        }
        else {
                setBubble(3)
                console.log("새로운 비디오가 잇읍니다");
                localStorage.setItem("VideoCnt", res.length);
                const lettergive = new Audio(require("../pages/main/bbomi_comment/lettergive.mp3"));
                lettergive.play();
                setTimeout(() => {
                    navigate("/videoletter", { state: res.reverse()[res.length - 1].fullUrl})
                    // navigate("/videoletter", { state: res[res.length - 1].fullUrl})
                }, 5000)
            }
        
        setSocket(socketIO);
    }, [director])
    useEffect(() => {
        return () => {
          if (socket) {
            socket.disconnect();
          }
        };
      }, [socket]);
    useEffect(() => {
        console.log(refs.current[0].offsetTop)
        refs.current[0].scrollIntoView()
    }, [director]);
    return (
        <>
        {bubble == 3 ? (
            <>
            <StretchDiv style={{
                    position: "absolute", 
                    width: "15rem",
                    right: "9rem",
                    top: "3rem"
                    }}  src={require("../pages/main/assets/bubble/letter4.png")}></StretchDiv>
                <img 
                style={{
                    position: "absolute", 
                    width: "30rem",
                    right: "2rem",
                    bottom: "3rem"
                    }} 
                src={require("../pages/main/assets/letter.gif")}></img>
            </>
        ) : (
            <>
            {bubble == 1 ? (
                <StretchDiv 
                style={{
                    position: "absolute", 
                    width: "40rem",
                    right: "2rem",
                    bottom: "3rem"
                    }} 
                src={require("../pages/main/assets/bubble/picture1.png")}></StretchDiv>
            ) : (
                <>
                {bubble == 2 ? (
                    <StretchDiv 
                    style={{
                        position: "absolute", 
                        width: "40rem",
                        right: "2rem",
                        bottom: "3rem"
                        }} 
                    src={require("../pages/main/assets/bubble/picture2.png")}></StretchDiv>
                ) : (<>/</>)}
                </>
            )}
            </>
        )}
        
            <MediaListBg>
                <div style={{background: "rgba(255, 255, 255, 0.5)", borderRadius: "20px", boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.07)"}}>
                    <div>
                        <img style={{height: "5rem", marginBottom: "1rem"}} src={require("../pages/main/assets/letterzip.png")}></img>
                    </div>
                    <PictureOuter>
                        <PictureContainerOuter>
                            {res.reverse().map((resp) => (
                                <PictureInner>
                                        {resp.id == director ? 
                                        ( <VideoContainerFocus 
                                            key={resp.id}
                                            ref={(el)=> (refs.current[0] = el)}
                                            src={resp.fullUrl}></VideoContainerFocus>) 
                                        : (<VideoContainer src={resp.fullUrl}></VideoContainer>)}
                                </PictureInner>
                            ))}
                        </PictureContainerOuter>
                    </PictureOuter>
                </div>
            </MediaListBg>
        </>
    );
};

export default ListVideo;