import React from "react";
import { useNavigate } from "react-router-dom";

const viewPhoto = () => {

    const navigate = useNavigate()
    setTimeout(()=> {navigate("/")}, 3000)
    return (
        <>
        <div style={{
            color: "white"
        }}>사진이 없어요</div>
        </>
    )
    
    
};

export default viewPhoto;
