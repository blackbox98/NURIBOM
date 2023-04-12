import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const VideoLetter = () => {
    const { state } = useLocation();
    const [users, setUsers] = useState(null);
    // API가 요청 중인지 아닌지, 2. 로딩상태
    const [loading, setLoading] = useState(false);
    //error, 3. 에러
    const [error, setError] = useState(null);
    const videoRef = React.useRef();
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchUsers = async () => {
            try {
                setUsers(null);
                setError(null);
                setLoading(true); //로딩시작
                const storage = getStorage();
                const url = await getDownloadURL(ref(storage, state))
                setUsers(url); //데이터 받아오고 setUser에 담기
                console.log(url)
            } catch (e) {
                setError(e); //에러가 발생한 경우
                console.log(e)
            }
            setLoading(false); //로딩이 끝났다는 것을 확인
        };
        fetchUsers();
}, []);
    function playVideo() {
        videoRef.current.play();
        console.log(videoRef.current);
    };

    function viewmeta(event) {
        console.log("dlrj", event.target.duration) 
        setTimeout(() => {navigate('/listvideo')}, (event.target.duration * 1000) + 2500)
    }

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생</div>;
    if (!users) return <div>없어</div>;

    return (
        <div>
            <video ref={videoRef} onLoadedMetadata={viewmeta} onCanPlayThrough={playVideo} src={users} style={{width: "100vw", height: "100vh"}} controls></video>
        </div>
    );
    
};
    
export default VideoLetter;
    