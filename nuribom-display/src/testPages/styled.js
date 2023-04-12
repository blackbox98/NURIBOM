import styled, { keyframes } from "styled-components";
import skyimg from "../pages/main/assets/skyimg.png";

export const MediaListBg = styled.div`
    height: 100vh;    
    background-image: url(${skyimg});
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const PictureContainer = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  @media screen and (max-width: 550px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`
export const PictureContainerFocus = styled.img`
  width: 14rem;
  height: 14rem;
  object-fit: cover;
  box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 1);
  @media screen and (max-width: 550px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`

export const VideoContainer = styled.video`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  @media screen and (max-width: 550px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`
export const VideoContainerFocus = styled.video`
  width: 14rem;
  height: 14rem;
  object-fit: cover;
  box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 1);
  @media screen and (max-width: 550px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`

export const PictureContainerOuter = styled.div`
  width: 75rem;
  height: 20vh;
  display: flex;
  flex-wrap: wrap;
`
export const PictureOuter = styled.div`
  width: 80rem;
  height: 70vh;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
`

export const PictureInner = styled.div`
  width: 15rem;
  height: 15rem;
`

const ChMove= keyframes`
    0%,100%{
        transform:translate(0%, 4%);
    }
    50%{
        transform:translate(0%,-4%);
    }
`

export const StretchDiv = styled.img`
  animation: ${ChMove} 2s infinite linear;
`;