import styled from "styled-components";
import skyimage from "../../pages/auth/assets/skyimg.png";

//main.js
export const MainContainer = styled.div`
  display: flex;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    gap: 10vh;
    background-repeat: repeat-y;
    height: 200vh;
  }
`;

export const CallenderContainer = styled.div`
  border-left: 1px solid #B4C7E7;
  border-right: 1px solid #B4C7E7;
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 950px) {
    width: 100vw;
  }
`;

export const UsersContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export const ProfileContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 950px) {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
`;

export const WorkerName = styled.span`
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
`;

export const DetailCircle = styled.div`
  width: 150px;
  height: 150px;
  background-color: yellow;
  border-radius: 50%;
  box-shadow: 0px 5px 5px gray;
  margin-top: 10vh;
  margin-bottom: 8vh;
`;

// Users.js (담당 어르신)
export const UserCard = styled.div`
  width: 22vw;
  height: 7rem;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  margin-left: 2vw;
  margin-right: 2vw;
  padding-left: 1vw;
  padding-right: 1vw;
  gap: 2vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 600px) {
    width: 80vw;
    gap: 4vw;
  }
`;
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
`;
export const UserCardInfos = styled.div`
  width: 14vw;
  @media screen and (max-width: 600px) {
    width: 56vw;
  }
`;

export const UserCardName = styled.div`
  width: 100%;
  font-size: 16px;
  color: black;
  font-weight: bold;
`;
export const UserCardVisit = styled.div`
  width: 100%;
  font-size: 14px;
  color: gray;
`;

export const AddBtnMain = styled.button`
  width: 5rem;
  height: 3.5rem;
  background-color: #4472c4;
  border-radius: 0.625rem;
  color: white;
  font-size: 1.25rem;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0.625rem;
  box-shadow: 0px 3px 1px #b4c7e7;
  border: none;
  &:hover {
    border: 1px solid #b4c7e7;
    box-shadow: 0px 0px 1px #b4c7e7;
    cursor: pointer;
  }
`;
