import React, {useEffect} from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
// import goto_game from "./goto_game.mp3";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
    const navigate = useNavigate();
    async function getFileFromPath(path){
        const response = await fetch(path)
        return await response.blob()
    }
    getFileFromPath(goto_game)
    .then((res)=> {
      console.log(res)
      const storage = getStorage();
      const storageRef = ref(storage, 'imagetest/goto_game.mp3');
      uploadBytes(storageRef, res).then((snapshot) => {
        console.log(snapshot);
      });
    })
    .catch((e)=> {console.log(e)})
    useEffect(() => {
      setTimeout(()=> {navigate("/")}, 5000)
    })

  return (
    <div style={{color: "white"}}>
        보호자에게 전송이 완료되었습니다!
    </div>
  );
};

export default UploadPage; 