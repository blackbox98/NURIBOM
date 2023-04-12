import styled, { keyframes } from 'styled-components';

import fine_01 from "./assets/fine_01.jpg"; 
import fine_02 from "./assets/fine_02.jpg"; 
import fine_03 from "./assets/fine_03.jpg"; 
import fine_05 from "./assets/fine_05.jpg"; 
import fine_06 from "./assets/fine_06.jpg"; 
import fine_07 from "./assets/fine_07.jpg"; 
import fine_08 from "./assets/fine_08.jpg";
import fine_09 from "./assets/fine_09.jpg";
import fine_10 from "./assets/fine_10.jpg";

import skyimg from "./assets/skyimg.png";

let backgroundfile = function(){
    let lilist = [fine_01, fine_02, fine_03, fine_06, fine_05, fine_07, fine_08, fine_09, fine_10]
    return lilist[Math.floor(Math.random()*9)]
}


export const LoadingBg = styled.div`
    height: 100vh;    
    background-image: url(${skyimg});
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`


export const Background = styled.div`
    height: 100vh;    
    background-image: url(${backgroundfile});
    background-size: cover;
    overflow: hidden;
`
export const MainBackground = styled.div`
    height: 100vh;    
    background-image: url(${backgroundfile});
    background-size: cover;
    overflow: hidden;
    display: flex;
    aligin-items: end;
`

export const MainBackgroundInner = styled.div`
    width: 100vw;
    background: linear-gradient(to top, rgba(0, 0, 0 ,0.7),rgba(0, 0, 0,0));
`

export const MainTileWrap = styled.div` 
    height : 100vh;
    display: flex;
    align-items: end;
    color: white;
`

export const MainTileWrapInner = styled.div` 
    width: 70vw;
    height: 27vh;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: space-evenly;
`

export const CommonTileForm = styled.img`
    width: 12rem;
    height: 9rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    outline: 0.5px rgba(255, 255, 255, 0.5) solid;
`

export const NuriBomLogoImage = styled.img`
    width: 25rem;
`

// Loading.js
export const NuriBomLoadingImg= styled.img`
    width: 45rem;
`

const ChMove = keyframes`
    0%, 100%{
        transform:translate(0%, 20%);
    }
    50%{
        transform:translate(0%, 0%);
    }
`;

export const GameBackground = styled.div`
    height: 100vh;    
    background-image: url(${skyimg});
    background-size: cover;
    overflow: hidden;
`

export const GameTitle = styled.img`
    animation: ${ChMove} 2s infinite linear;
`
const BMove= keyframes`
    0%,100%{
        transform:translate(0%, 4%);
    }
    50%{
        transform:translate(0%,-4%);
    }
`

export const MainBubble = styled.img`
  animation: ${BMove} 2s infinite linear;
`;

const LMove= keyframes`
    0%,100%{
        transform:translate(0%, 2%);
    }
    50%{
        transform:translate(0%,-2%);
    }
`

export const LetterAni = styled.img`
  animation: ${LMove} 2s infinite linear;
`;


