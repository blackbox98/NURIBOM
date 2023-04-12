import React from 'react';
import { useLocation } from "react-router";
import {
    UserUpdateAndDeleteBtn,
    RegistBackground,
    UploadContainer,
    PictureContainer,
    PictureContainerWrap,
    PictureContainerTitle
  } from "./styled";
import { useNavigate } from "react-router-dom";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useState, useEffect } from "react";

import Header from "../../components/layout/Header";

const UserPhoto = () => {
    const { state } = useLocation();
    const [photos, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    /** 어르신 사진 업로드 페이지 이동 */
    const onHandleUploadFile = () => {
        navigate(`/worker/uploadfile/${state.careListResponse.workerId}/${state.careListResponse.userId}`, { state: state });
    };
    // Create a reference under which you want to list
    const listRef = ref(storage, `picture_${state.serialNo}`);
    console.log(listRef)

    useEffect(() => {
        const fetchPhotos = async () => {
        try {
            // Find all the prefixes and items.
            listAll(listRef)
            .then((res) => {
                let ptlist = []
                const list = async () => {
                    for(let itemRef of res.items){
                        await getDownloadURL(ref(storage, itemRef._location.path_))
                        .then((res2) => {
                            console.log(res2)
                            ptlist.push({ name: itemRef._location.path_, fullUrl: res2 })
                        });
                    }
                    setPhotoList(ptlist);
                  }
                  list();
            }).catch((error) => {
                console.log(error)
            });
          } catch (e) {
            setError(e); //에러가 발생한 경우
          }
          setLoading(false); //로딩이 끝났다는 것을 확인
        };
        fetchPhotos();
      }, []);
    
    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생</div>;
    if (!photos) return <div>암것두 없엉</div>;
    return (
            <>
                <Header></Header>
                <RegistBackground>
                    <UploadContainer>
                        <div style={{display: "flex", marginBottom: "0.5rem"}}>
                            <PictureContainerTitle>어르신과 공유한 사진</PictureContainerTitle>
                            <UserUpdateAndDeleteBtn onClick={onHandleUploadFile} style={{width: "60px"}}>
                                추가
                            </UserUpdateAndDeleteBtn>
                        </div>
                        <PictureContainerWrap>
                            <div>
                            {photos.map((user) => (
                                    <PictureContainer src={user.fullUrl}></PictureContainer>
                                ))}
                            </div>
                        </PictureContainerWrap>
                    </UploadContainer>
                </RegistBackground>
            </>
    );
};

export default UserPhoto;