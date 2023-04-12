import React from "react";
import { useNavigate } from "react-router-dom";

const LetterLoading = () => {
    const navigate = useNavigate()
    setTimeout(()=> {navigate("/")}, 3000)

};

export default LetterLoading;
