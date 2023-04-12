import styled from "styled-components";
import skyimage from "../../pages/auth/assets/skyimg.png"; 

export const RegistBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${skyimage});
    background-size: cover;
    display: flex;
    justify-content:center;
    align-items: center;
`;

export const NoticeTitle = styled.div`
    height: 20vh;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content:center;
`

export const NoticeContents = styled.div`
    height: 80vh;
`

export const NoticeCard = styled.div`
    height: 3rem;
    width: 7rem;
    background: 
`

export const UserCard = styled.div`
    margin-top: 0.7rem;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 10px;
    margin-left: 2vw;
    margin-right: 2vw;
    padding-left: 1vw;
    padding-right: 1vw;
    gap: 2vw;
    border : 2px solid #000000;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 600px) {
        width: 80vw;
        gap: 4vw;
    }

`

export const UserCardChecked = styled.div`
    margin-top: 0.7rem;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 10px;
    margin-left: 2vw;
    margin-right: 2vw;
    padding-left: 1vw;
    padding-right: 1vw;
    border : 2px solid #f9f9f9;
    color: #707070;
    gap: 2vw;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 600px) {
        width: 80vw;
        gap: 4vw;
    }

`
export const UserCardCircle = styled.div`
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    background-color: yellow;
    margin-top: 1vh;
    margin-bottom: 1vh;
    @media screen and (max-width: 600px) {
        width: 20vw;
        height: 20vw;
    }
`
export const UserCardInfos = styled.div`
    width: 50vw;
    @media screen and (max-width: 600px) {
        width: 56vw;
    }
`

export const UserCardName = styled.div`
    width: 100%;
    font-size: 16px;
    color: black;
    font-weight: bold
`

export const UserCardNameChecked = styled.div`
    width: 100%;
    font-size: 16px;
    color: #707070;
    font-weight: bold
    font-weight: gray
`


export const UserCardVisit = styled.div`
    width: 100%;
    font-size: 14px;
    color: gray;
`