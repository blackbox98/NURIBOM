import React, {useRef, useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
    MediaListBg,
    PictureContainer,
    PictureContainerFocus,
    PictureContainerOuter,
    PictureOuter,
    PictureInner,
    StretchDiv
} from "./styled";

const ListPhoto = () => {
    const refs = useRef([]);
    const navigate = useNavigate();
    const user = localStorage.getItem('UserSerial')
    const res = JSON.parse(sessionStorage.getItem(`picture_${user}`))
    const [director, setDirector] = useState(res.length);
    const [bubble, setBubble] = useState(1);
    const [bubbleinfo, setBubbleInfo] = useState(0);
    const [socket, setSocket] = useState();
    
    useEffect(() => {
        const socketIO = io("http://127.0.0.1:9999");
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
            } 
            else if (msg.message == "home") { navigate("/main"); } 
            else if (msg.message == "this") { 
                navigate(`/viewpicture`, {state: `${res.reverse()[director-1].id-1}`})
            }
            else { console.log("잘못입력") }
        });
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
            
            <MediaListBg>
                <div style={{background: "rgba(255, 255, 255, 0.5)", borderRadius: "20px", boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.07)"}}>
                    <div>
                        <img style={{height: "5rem", marginBottom: "1rem"}} src={require("../pages/main/assets/picturezip.png")}></img>
                    </div>
                    <PictureOuter>
                        <PictureContainerOuter>
                            {res.reverse().map((resp) => (
                                <PictureInner>
                                        {resp.id == director ? 
                                        ( <PictureContainerFocus 
                                            key={resp.id}
                                            ref={(el)=> (refs.current[0] = el)}
                                            src={resp.fullUrl}></PictureContainerFocus>) 
                                        : (<PictureContainer src={resp.fullUrl}></PictureContainer>)}
                                </PictureInner>
                            ))}
                        </PictureContainerOuter>
                    </PictureOuter>
                </div>
            </MediaListBg>
        </>
    );
};

export default ListPhoto;