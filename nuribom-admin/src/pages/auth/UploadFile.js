import React from 'react';
import { ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

import {
  RegistBackground,
  UploadContainer,
  InputStyle,
  InputStyleBtn,
  PhotoStr
} from "./styled";

import Header from "../../components/layout/Header";

const UploadFile = () => {
    function numFormat(variable) {
      variable = Number(variable).toString(); 
      if (Number(variable) < 10 && variable.length == 1) variable = "0" + variable;
      return variable;
    }
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hou = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let dString = year.toString() + month.toString() + numFormat(day).toString() + hou.toString() + min.toString() + sec.toString()
    console.log(dString)

    const navigate = useNavigate();
    const { state } = useLocation();

    const fileInput = React.useRef();

    const uploadFB=()=>{
      let image = fileInput.current.files[0]; 
      const storageRef = ref(storage, `picture_${state.serialNo}/${dString}-${image.name}`);

      uploadBytes(storageRef, fileInput.current.files[0]).then((snapshot) => {
          console.log(snapshot);
        });
      alert("사진이 등록되었습니다!")
      navigate(`/worker/userdetail/${state.careListResponse.workerId}/${state.careListResponse.userId}`)
    }
  return (
      <>
        <Header></Header>
        <RegistBackground>
          <UploadContainer>
            <PhotoStr>📷 사진 업로드</PhotoStr>
            <p>어르신의 셋톱박스로 사진이 공유됩니다.</p>
              <InputStyle type="file" accept='image/jpeg,image/gif,image/png' ref={fileInput}/>
              <InputStyleBtn onClick={uploadFB}>업로드하기</InputStyleBtn>
          </UploadContainer>
        </RegistBackground>
      </>
  );
};

export default UploadFile;
