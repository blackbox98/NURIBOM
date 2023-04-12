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
export const RegistContainer = styled.div`
    width: 70vw;
    padding-top: 4vh;
    padding-bottom: 4vh;
    display: flex;
    flex-direction:column; 
    align-items: center;
    background: #FFFFFF;
    border: 1px solid #B4C7E7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

`;

export const RegistTitle = styled.div`
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 50px;
    @media screen and (max-width: 600px) {
        font-size: 20px;
    }
`

export const InputTitle = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-bottom: 1vh;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const InputBox = styled.input`
  width: 40vw;
  height: 30px;
  border: 1px solid #b4c7e7;
  border-radius: 10px;
  margin-bottom: 1vh;
  font-size: 16px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4vw;
  margin-top: 4vh;
`;

export const MedicineButton = styled.button`
  width: 10vw;
  height: 5vh;
  font-size: 20px;
  background: #4472c4;
  border-radius: 16px;
  text-align: center;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
