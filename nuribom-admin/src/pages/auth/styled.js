import styled from "styled-components";
import image from "./assets/auth.png"; 
import authop from "./assets/authop.png"; 
import skyimage from "./assets/skyimg.png"; 


// LoginUser.js
export const Title = styled.img`
    max-width: 31.125rem;
    max-height: 11.0625rem;
    width: 100vh;
    height: 35vh;
    @media screen and (max-width: 950px) {
        width: 27rem;
        height: 10rem;
    }
    @media screen and (max-width: 680px) {
        width: 20rem;
        height: 7rem;
    }
    
`

export const TitleSentence = styled.div`
    margin-bottom: 50px;
    margin-top: 10px;
    font-size: 2.2rem;
    color: #707070;
    @media screen and (max-width: 950px) {
        font-size: 2rem;
    }
    @media screen and (max-width: 680px) {
        font-size: 1.7rem;
    }
    @media screen and (max-width: 550px) {
        font-size: 1.5rem;
    }
`

export const StartButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`

export const StartButton = styled.button`
    width: 8.125rem;
    height: 4.375rem;
    background-color: #4472C4;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.25rem;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0.625rem;
    box-shadow: 0px 3px 1px #B4C7E7;
    border:none;
    &:hover {
        border: 1px solid #B4C7E7;
        box-shadow: 0px 0px 1px #B4C7E7;
        cursor: pointer;
    }
    @media screen and (max-width: 950px){
        font-size: 1rem;
        width: 6.5rem;
    }
`

// LoginWorker.js
export const LoginWorkerIDPWWrap = styled.div`
    display:  flex;
    justify-content:  center;
    align-items: center;
    width: 30rem;
    height: 3rem;
    margin-bottom: 1.5rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    color: #4472C4;
    @media screen and (max-width: 950px) {
        width: 20rem;
    }
`

export const LoginInputTag = styled.input`
    width: 20rem;
    height: 2rem;
    border: none;
    &:focus {
        outline:none;
    }
    @media screen and (max-width: 950px) {
        width: 13rem;
    }
`

export const LoginWorkerID = styled.div`
    width:  7rem;
    height:  2.5rem;
    display:  flex;
    justify-content:  center;
    align-items:  center;
    font-size:  20px;
    font-weight: bold;
    @media screen and (max-width: 950px) {
        width:  5.5rem;
    }
`

export const LoginWorkerPW = styled.div`
    margin-top:  20px;
    width:  7rem;
    height:  2.5rem;
    display:  flex;
    justify-content:  center;
    align-items:  center;
    font-size:  20px;
    @media screen and (max-width: 950px) {
        width: 5.5rem;
    }
`


// RegistWorker.js
export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${image});
    background-size: cover;
    text-algin : center;
    @media screen and (max-width: 950px) {
        display: flex;
        text-algin : center;
        font-size: 16px;
        background-image: url(${authop});
        background-size: cover;
    }
`;

export const LoginContainerInner = styled.div`
    @media screen and (max-width: 950px) {
    }
`

export const LoginContainerTitle = styled.div`
    margin-bottom: 3.125rem;
    margin-top: 0.625rem;
    font-size: 2.5rem;
    font-weight: bold;
    @media screen and (max-width: 950px) {
        font-size: 2rem;
        margin: 0;
    }
`
export const DisplayFlexDiv = styled.form`
    display: flex;
    justify-content: center;
    @media screen and (max-width: 950px) {
        display: block;
    }
`
export const DuplicateCheckButton = styled.button`
    width: 6.5rem;
    height: 2.5rem;
    background-color: #4472C4;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.25rem;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0.625rem;
    box-shadow: 0px 3px 1px #B4C7E7;
    border:none;
    &:hover {
        border: 1px solid #B4C7E7;
        box-shadow: 0px 0px 1px #B4C7E7;
        cursor: pointer;
    }
    @media screen and (max-width: 950px){
        font-size: 0.8rem;
        width: 5rem;
        height: 2rem;
    }
`


export const IDDuplicateCheckWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.25rem;
    margin-top: 0.625rem;
    width: 15.625rem;
    @media screen and (max-width: 950px) {
        display: block;
        margin-left: 0;
        margin-bottom: 2.5rem;
    }
`

export const IDDuplicateCheckWrapInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 950px) {
        display: flex;
        justify-content: start;
        align-items: center;
    }
`

export const RegistInputSentence = styled.div`
    font-size : 0.9375rem;
    color : #707070;
    margin-top : 1.25rem;
`



export const LoginInPutTag = styled.input`
    height: 2.5rem;
    width: 21rem;
    padding-left: 1.25rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
    @media screen and (max-width: 950px) {
        height: 2rem;
        width: 27rem;
    }
    @media screen and (max-width: 680px) {
        width: 20rem;
    }
    @media screen and (max-width: 550px) {
        width: 14.5rem;
    }
    @media screen and (max-width: 420px) {
        
    }
    @media screen and (max-width: 380px) {
        width: 12rem;
    }
`

export const PWInPutTag = styled.input`
    height: 2.5rem;
    width: 25.625rem;
    padding-left: 1.25rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    margin-top: 0.625rem;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
    @media screen and (max-width: 950px) {
        margin-left: 0;
        width: 32.5rem;
        height: 2rem;
    }
    @media screen and (max-width: 680px) {
        width: 26.5rem;
    }
    @media screen and (max-width: 550px) {
        width: 20rem;
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
        width: 18rem;
    }
`
export const PwNotValid = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.25rem;
    margin-top: 0.625rem;
    max-width: 16.875rem;
    width: auto;
    color: red;
    @media screen and (max-width: 950px) {
        display: block;
        margin-left: 0;
        margin-bottom: 2.5rem;
    }
    
`

export const PwValid = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.25rem;
    margin-top: 0.625rem;
    maxWidth: 16.875rem;
    width: auto;
    color: #4472C4;
    @media screen and (max-width: 950px) {
        display: block;
        margin-left: 0;
        margin-bottom: 2.5rem;
    }
`

export const PwNotMatch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.25rem;
    margin-top: 0.625rem;
    width: 16.875rem;
    color: red;
    @media screen and (max-width: 950px) {
        display: block;
        margin-left: 0;
        margin-bottom: 2.5rem;
    }
`

export const PwMatch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.25rem;
    margin-top: 0.625rem;
    width: 16.875rem;
    color: #4472C4;
    @media screen and (max-width: 950px) {
        display: block;
        margin-left: 0;
        margin-bottom: 2.5rem;
    }
`

export const RegistContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${image});
    background-size: cover;
`;


export const InPutTag = styled.input`
    height: 2.5rem;
    width: 43.75rem;
    padding-left: 1.25rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
    @media screen and (max-width: 950px) {
        margin-left: 0;
        width: 32.5rem;
        height: 2rem;
    }
    @media screen and (max-width: 680px) {
        width: 26.5rem;
    }
    @media screen and (max-width: 550px) {
        width: 20rem;
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
        width: 18rem;
    }
`

// RegistUser.js
export const RegistUserContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${skyimage});
    background-size: cover;
`

export const RegistUserContainerWrap = styled.div`
    margin-bottom: 1.875rem;
    margin-top: 0.625rem;
    font-size: 1.875rem;
    font-weight: bold;
`

export const RegistUserInput = styled.input`
    height: 2.5rem;
    width: 90%;
    padding-left: 1.25rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
`

export const LoginButton = styled.button`
    width: 5.625rem;
    height: 2.5rem;
    background-color: #4472C4;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.25rem;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0.625rem;
    box-shadow: 0px 3px 1px #B4C7E7;
    border:none;
    &:hover {
        border: 1px solid #B4C7E7;
        box-shadow: 0px 0px 1px #B4C7E7;
        cursor: pointer;
    }
    @media screen and (max-width: 950px){
        font-size: 0.8rem;
    }
`


export const InputSentence = styled.div`
    font-size: 0.9375rem;
`

export const InputTitle = styled.div`
    margin-bottom: 3.125rem;
    margin-top: 0.625rem;
    font-size: 1.875rem;
    font-weight : bold;
`

export const RegistUserContainerInner = styled.div`
    width: 55rem;
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(242, 247, 255, 0.7);
    border-radius: 1.875rem;
    border: solid 2px #B4C7E7;
    box-shadow: 0px 5px 5px gray;

    @media screen and (max-width: 950px) {
        width: 40rem;
        height: 43rem;
    }
    @media screen and (max-width: 680px) {
    }
    @media screen and (max-width: 550px) {
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
    }
`

export const RegistInfoTagWrap = styled.div`
    display : flex;
    align-items: center;
    @media screen and (max-width: 950px) {
        display : block;
    }
    @media screen and (max-width: 680px) {
    }
    @media screen and (max-width: 550px) {
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
    }
`


export const RegistInfoTag = styled.div`
    width : 13.125rem;
    height : 2.5rem;
    display : flex;
    justify-content : center;
    align-items: center;
    margin : 0.625rem;
    font-size : 1.25rem;
    @media screen and (max-width: 950px) {
        margin :0;
        display : block;
    }
    @media screen and (max-width: 680px) {
    }
    @media screen and (max-width: 550px) {
    }
    @media screen and (max-width: 420px) {
    }
    @media screen and (max-width: 380px) {
    }
`

export const BirthSelectTag = styled.select`
    width: 9.5625rem;
    height: 2.8125rem;
    border-radius: 0.75rem;
    outline: none;
    margin: 0.5rem;
    border: 2px solid #B4C7E7;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
    @media screen and (max-width: 950px) {
        width: 9.5rem;
        margin-top: 0;
        margin-bottom: 1rem;
    }
    @media screen and (max-width: 680px) {
        width: 8.5rem;
    }
    @media screen and (max-width: 550px) {
        width: 6.3rem;
    }
    @media screen and (max-width: 420px) {
        width: 5.5rem;
    }
    @media screen and (max-width: 380px) {
        width: 5.5rem;
    }
`


export const InfoInPutTag = styled.input`
    height: 2.5rem;
    width : 29.0625rem;
    padding-left: 1.25rem;
    border: solid 2px #B4C7E7;
    border-radius: 0.9375rem;
    margin : 0.625rem;
    &:focus {
        outline:none;
        border: solid 2px #4472C4;
    }
    @media screen and (max-width: 950px) {
        width: 29.0625rem;
        margin: 0;
        margin-bottom: 1rem;
    }
    @media screen and (max-width: 680px) {
        width: 26.5rem;
    }
    @media screen and (max-width: 550px) {
        width: 20rem;
    }
    @media screen and (max-width: 420px) {
        width: 18rem;
    }
    @media screen and (max-width: 380px) {
        width: 18rem;
    }
`

export const RegistBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${skyimage});
    background-size: cover;
    display: flex;
    justify-content:center;
    align-items: center;
`;

export const UploadContainer = styled.div`
    width: 70vw;
    padding: 4vh;
    // padding-bottom: 4vh;
    display: flex;
    flex-direction:column; 
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #B4C7E7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`;

export const PicAndVidGoButton = styled.button`
    width: 15rem;
    height: 12rem;
    background-color: #4472C4;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.5rem;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0.625rem;
    box-shadow: 0px 3px 1px #B4C7E7;
    border:none;
    &:hover {
        border: 1px solid #B4C7E7;
        box-shadow: 0px 0px 1px #B4C7E7;
        cursor: pointer;
    }
    @media screen and (max-width: 950px){
        font-size: 1.5rem;
        width: 11rem;
        height: 9rem;
    }
`

export const PicAndVidGoButtonWrap = styled.div`
    display: flex;
    @media screen and (max-width: 950px){
        display: block;
    }
`

export const PicAndVidBG = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PicAndVidGoButtonWrapOuter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PicAndVidLetter = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 20px;
    @media screen and (max-width: 950px){
        font-size: 1.2rem;
    }
`

export const PicAndVidBGInner = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
`

export const InputStyle = styled.input`

    @media screen and (max-width: 550px){
        width: 15rem;
    }
`

export const InputStyleBtn = styled.button`
    outline: none;
    border: none;
    background-color: #4472C4;
    width: 6rem;
    height: 3rem;
    margin: 1rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    box-shadow: 0px 3px 1px #B4C7E7;
    border:none;
    &:hover {
        border: 1px solid #B4C7E7;
        box-shadow: 0px 0px 1px #B4C7E7;
        cursor: pointer;
    }
`

export const PhotoStr = styled.div`
    font-size: 2rem;
    font-weight: bold;
    @media screen and (max-width: 700px){
        font-size: 1.2rem;
    }
`