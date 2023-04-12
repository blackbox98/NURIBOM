import React from 'react';
import {
    PicAndVidGoButton,
    PicAndVidGoButtonWrap,
    PicAndVidBG,
    PicAndVidGoButtonWrapOuter,
    PicAndVidLetter,
    PicAndVidBGInner
  } from "./styled";
  import { useNavigate } from "react-router-dom";
  import { useLocation } from "react-router";

  import Header from "../../components/layout/Header";

const UploadPicAndVid = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)

    const uploadPIC=()=>{
        navigate(`/worker/photo/${state.careListResponse.workerId}/${state.careListResponse.userId}`, { state: state });
    }

    const uploadVID=()=>{
        navigate(`/worker/video/${state.careListResponse.workerId}/${state.careListResponse.userId}`, { state: state });
    }
    return (
        <>
            <Header></Header>
            <PicAndVidBG>
                <PicAndVidBGInner>
                    <PicAndVidLetter>사진 및 영상 게시</PicAndVidLetter>
                    <PicAndVidGoButtonWrapOuter>
                        <PicAndVidGoButtonWrap>
                            <PicAndVidGoButton onClick={uploadPIC}>📷 사진</PicAndVidGoButton>
                            <PicAndVidGoButton onClick={uploadVID}>🎬 영상편지</PicAndVidGoButton>
                        </PicAndVidGoButtonWrap>
                    </PicAndVidGoButtonWrapOuter>
                </PicAndVidBGInner>
            </PicAndVidBG>
        </>
    );
};

export default UploadPicAndVid;