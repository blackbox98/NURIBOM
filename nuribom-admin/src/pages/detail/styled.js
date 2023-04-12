import styled from "styled-components";
import skyimage from "../auth/assets/skyimg.png";

export const DetailContainer = styled.div``;

export const ProfileContainer = styled.div`
  width: 100vw;
  height: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DisplayCenterDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 950px) {
    display: block;
  }
  @media screen and (max-width: 680px) {
  }
  @media screen and (max-width: 550px) {
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 380px) {
  }
`;

export const DetailInfoContainer = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  height: calc(70vh - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 950px) {
    height: auto;
  }
  @media screen and (max-width: 680px) {
  }
  @media screen and (max-width: 550px) {
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 380px) {
  }
`;

export const CalendarCardContainer = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 5rem;
  @media screen and (max-width: 950px) {
    height: calc(70vh - 6rem);
    margin-top: 0;
  }
  @media screen and (max-width: 680px) {
  }
  @media screen and (max-width: 550px) {
  }
  @media screen and (max-width: 420px) {
    height: calc(60vh - 4rem);
  }
  @media screen and (max-width: 380px) {
  }
`;

export const DetailCircle = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  background-color: lightgreen;
  border-radius: 50%;
  box-shadow: 0px 5px 5px gray;
  @media screen and (max-width: 950px) {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  @media screen and (max-width: 550px) {
    width: 4rem;
    height: 4rem;
    display: block;
  }
`;

export const DetailInfoWrap = styled.div`
  margin-left: 4vw;
  width: 30vw;
  @media screen and (max-width: 950px) {
    width: 55vw;
  }
  @media screen and (max-width: 550px) {
    width: 65vw;
  }
`;

export const InfoSentence = styled.div`
  margin: 0.625rem;
`;

// MedicineCard

export const DetailCardFormMed = styled.div`
  width: 24.5vw;
  height: 90%;
  background-color: white;
  padding: 1.27rem;
  border-radius: 0.5rem;
  margin: 1rem;
  @media screen and (max-width: 950px) {
    width: 24rem;
    height: auto;
    margin: 0;
    margin-bottom: 2rem;
  }
  @media screen and (max-width: 680px) {
    width: 22rem;
  }
  @media screen and (max-width: 550px) {
    width: 17rem;
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 380px) {
  }
`;

export const DetailCardFormCal = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  @media screen and (max-width: 950px) {
    margin-top: 25rem;
    height: auto;
  }
`;

export const DetailCardFormWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const DetailCardTop = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

export const MdCardOverFlow = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const DetailCardBtm = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 87%;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media screen and (max-width: 950px) {
    display: block;
    height: auto;
  }
  @media screen and (max-width: 680px) {
  }
  @media screen and (max-width: 550px) {
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 380px) {
  }
`;

export const MedicineCardForm = styled.div`
  border-radius: 1.25rem;
  height: 10rem;
  margin-bottom: 0.625rem;
  border: solid 2px #b4c7e7;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 680px) {
    height: 7.5rem;
  }
`;

export const DetailSubmitButton = styled.button`
  width: 9.375rem;
  height: 2.5rem;
  background-color: #4472c4;
  border-radius: 0.625rem;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0px 3px 1px #b4c7e7;
  border: none;
  &:hover {
    border: 1px solid #b4c7e7;
    box-shadow: 0px 0px 1px #b4c7e7;
    cursor: pointer;
  }
`;

export const UserUpdateAndDeleteBtn = styled.button`
  width: 6rem;
  height: 2.5rem;
  background-color: #4472c4;
  border-radius: 0.625rem;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0px 3px 1px #b4c7e7;
  border: none;
  margin: 0.5rem;
  &:hover {
    border: 1px solid #b4c7e7;
    box-shadow: 0px 0px 1px #b4c7e7;
    cursor: pointer;
  }
`;

export const DayWeekSelected = styled.div`
  color: #black;
  font-weight: bold;
  font-size: 1.4rem;
  @media screen and (max-width: 750px) {
    font-size: 1rem;
  }
`;
export const DayWeekDeselected = styled.div`
  color: #707070;
  font-size: 1.4rem;
  @media screen and (max-width: 750px) {
    font-size: 1rem;
  }
`;
export const DayWeekWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const TimeSet = styled.div`
  margin-left: 10%;
  width: 90%;
  font-size: 2.5rem;
  @media screen and (max-width: 750px) {
    font-size: 2rem;
  }
`;

export const AlarmTitle = styled.div`
  margin-left: 5%;
  width: 95%;
  font-size: 1.4rem;
  @media screen and (max-width: 750px) {
    font-size: 1rem;
  }
`;

export const MedicineCardFormInner = styled.div`
  width: 90%;
`;
export const IconWrap = styled.div`
  width: 10%;
  height: 95%;
  margin-top: 5%;
  margin-right: 5%;
`;

export const UserInFoInnerCard = styled.div`
  display: flex;
  @media screen and (max-width: 950px) {
    display: block;
  }
`;

export const RegistBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${skyimage});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadContainer = styled.div`
  width: 70vw;
  padding: 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border: 1px solid #b4c7e7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const UserActivationOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const UserActivation = styled.div`
  width: 83vw;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.27rem;

  @media screen and (max-width: 950px) {
    width: 24rem;
    height: auto;
  }
  @media screen and (max-width: 680px) {
    width: 22rem;
  }
  @media screen and (max-width: 550px) {
    width: 17rem;
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 380px) {
  }
`;

export const StretchAndSongForm = styled.div`
  height: 5rem;
  border-radius: 10px;
  margin-bottom: 0.625rem;
  border: solid 1px #b4c7e7;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StretchAndSongIconWrap = styled.div`
  width: 10%;
  height: 75%;
  margin-top: 5%;
  margin-right: 5%;
  @media screen and (max-width: 950px) {
    height: 60%;
  }
`;
export const PictureContainer = styled.img`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  @media screen and (max-width: 550px) {
    width: 4.5rem;
    height: 4.5rem;
  }
`;

export const PictureContainerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PictureContainerTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  @media screen and (max-width: 950px) {
    font-size: 1.1rem;
  }
`;
