import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const viewPhoto = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [director, setDirector] = useState(parseInt(state));
    const [socket, setSocket] = useState();
    const user = localStorage.getItem('UserSerial')
    console.log("뭐임이거",typeof(state))
    const res = JSON.parse(sessionStorage.getItem(`picture_${user}`))
    
    if (res.length == 0) {
        console.log("없다교 ")
    return (
        <div
        style={{
            color: "white"
          }}>
            없어요
        </div>
        )
    } else {
        useEffect(() => {
            const socketIO = io("http://127.0.0.1:9999");
            socketIO.send("photo");
            console.log("이거왜안되셈 !!!!!!!!!!!!!!!!", res.length, res)
            socketIO.on("message", function (msg) {
              console.log("?이거", msg);
              if (msg.message == "next") {
                if(director == 0) {
                    setDirector(res.length-1)
                    console.log(director)
                }
                else {
                    setDirector(director-1)
                    console.log(director)
                }
              } else if (msg.message == "prev") {
                    if(director == res.length-1) {
                        setDirector(0)
                        console.log(director)
                    }
                    else {
                        setDirector(director+1)
                        console.log(director)
                    }
              } else if (msg.message == "home") {
                navigate("/main");
              } else if (msg.message == "bg") {
                localStorage.setItem("BgImg", res[director].fullUrl)
                navigate("/")
              } else {
                console.log("잘못입력")
                setDirector(director)
              }
            });
            setSocket(socketIO);
          }, [director]);
    
          useEffect(() => {
            return () => {
              if (socket) {
                socket.disconnect();
              }
            };
          }, [socket]);
        return (
            <div>
                <img style={{ 
                    objectFit: "contain",
                    width: "100vw", 
                    height: "100vh",
                    overflow: "hidden"
                    }} src={res[director].fullUrl}></img>
            </div>
        );
    }
    
    
};

export default viewPhoto;
