import { useContext } from "react";
import {SocketContext} from "../../../context/socket"
import { useNavigate } from "react-router-dom";


const maincommand = function() {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    
    
    socket.on('message', function(msg){
        console.log(msg)
    
        if (msg.message == '체조') {
            // const goto_strech = new Audio(require("../bbomi_comment/goto_strech.mp3"));
            // goto_strech.play();  
            // console.log(goto_strech.duration, "dlrjwlrma?")
            // setTimeout(function(){ 
            //     navigate("/")
            // }, 5000);
            navigate("/")
        }
        else if (msg.message == '음악') {
            // const goto_strech = new Audio(require("../bbomi_comment/goto_music.mp3"));
            // goto_strech.play();  
            // console.log(goto_strech.duration, "dlrjwlrma?")
            // setTimeout(function(){ 
            //     navigate("/music")
            // }, 5000);
            navigate("/music")
        }
        else if (msg.message == '초성') {
            // const goto_game = new Audio(require("../bbomi_comment/goto_game.mp3"));
            // goto_game.play();
            // setTimeout(function(){ 
            //     navigate("/letter")
            // }, 5000);
            navigate("/letter")
        }
        else if (msg.message == '홈') {
            // setTimeout(function(){ 
            //     navigate("/main")
            // }, 5000);
            navigate("/main")
        }
    });
}
  
export { maincommand };
