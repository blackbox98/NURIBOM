import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const ViewVideo = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const socketIO = io("http://127.0.0.1:9999");
        socketIO.on("message", function (msg) {
            if (msg.message == "home") { navigate("/main"); }
            else if (msg.message == "next") {
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
            }
        })
    })
    const user = localStorage.getItem('UserSerial')
    const res = JSON.parse(sessionStorage.getItem(`video_${user}`))
    console.log(res)
    
    const { state } = useLocation();
    const [director, setDirector] = useState(parseInt(state));

    if (res.length == 0) {
        return (
            <div
            style={{
                color: "white"
            }}>
                없어요
            </div>
        )
    }
    else {
        function viewmeta(event) {
            console.log("dlrj", event.target.duration) 
            setTimeout(() => {
                if (director == 0) {
                    setDirector(res.length-1)
                    console.log(director)
                }
                else {
                    setDirector(director-1)
                    console.log(director)
                }
            }, (event.target.duration * 1000) + 2500)
        }
        
        return (
            <>
                <div>
                    <video autoPlay onLoadedMetadata={viewmeta} src={res[director].fullUrl} style={{width: "100vw", height: "100vh"}} controls></video>
                </div>
            </>
        )
    }
    
};

export default ViewVideo;