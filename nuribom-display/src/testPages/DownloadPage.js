import { getStorage, listAll, ref, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MediaListBg,
  StretchDiv
} from "./styled";

function DownloadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  //결과물, 1. 요청의 결과
  const [photos, setPhotoList] = useState(null);
  // sessionStorage.removeItem("photos")
  // API가 요청 중인지 아닌지, 2. 로딩상태
  const [loading, setLoading] = useState(false);
  //error, 3. 에러
  const [error, setError] = useState(null);

  // const [mindex, setMindex] = useState(0)


  // Create a reference under which you want to list
  const storage = getStorage();
  const listRef = ref(storage, `${location.state}`);

    useEffect(() => {
        const fetchPhotos = async () => {
        try {
            // setUsers(null);
            // setError(null);
            setLoading(true); //로딩시작

            // Find all the prefixes and items.
            await listAll(listRef)
            .then((res) => {
              let ptlist = [] 
              console.log("이거이거", res.items.length)
              const list = async () => {
                    let mindex = 0
                    for(let itemRef of res.items){
                        mindex = mindex + 1
                        await getDownloadURL(ref(storage, itemRef._location.path_))
                        .then((res2) => {
                            ptlist.push({id:mindex, name: itemRef._location.path_, fullUrl: res2 }) //사진 이름까지 해서 객체로 저장함
                            // ptlist.push(res2) // 사진의 url만 세션스토리지에 저장함
                        });
                    }
                    setPhotoList(ptlist);
                    console.log(ptlist)
                    sessionStorage.setItem(`${location.state}`, JSON.stringify(ptlist)) // 배열을 스토리지에 저장할때 JSON.stringify() 사용
                    if (ptlist.length == 0) {
                      navigate("/anyphoto")
                    } else {
                      navigate(`/list${location.state.split('_')[0]}`, {state: ptlist.length})
                      // navigate(`/view${location.state.split('_')[0]}`, {state: "0"})
                    }
                  }
                  list();
            })
            .catch((error) => {
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
  if (!photos) {
    if (location.state.split('_')[0] == "picture") {
      return (
        <MediaListBg>
          <div>
            <div>
              <img style={{width: "35rem", margin: "2rem"}} src={require("../pages/main/assets/photoloading.gif")}></img>
            </div>
            <div>
              <StretchDiv 
              src={require("../pages/main/assets/bbomi_letterloading.png")}
              style={{width: "20rem"}}
              ></StretchDiv>
            </div>
          </div>
        </MediaListBg>
      );
    }
    else if (location.state.split('_')[0] == "video") {
      return (
        <MediaListBg>
          <div>
            <div>
              <img style={{width: "35rem", margin: "2rem"}} src={require("../pages/main/assets/letterloading.gif")}></img>
            </div>
            <div>
              <StretchDiv 
              src={require("../pages/main/assets/bbomi_letterloading.png")}
              style={{width: "20rem"}}
              ></StretchDiv>
            </div>
          </div>
        </MediaListBg>
      );
    }
  }
  
}

export default DownloadPage;