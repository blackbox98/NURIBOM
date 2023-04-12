import React from "react";
import MedicineForm from "../../components/regist/MedicineForm";
import { useNavigate, useParams } from "react-router-dom";
import { RegistBackground, RegistTitle, RegistContainer } from "./styled";
import Header from "../../components/layout/Header"

const MedicineRegist = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;
  return (
    <>
    <Header></Header>
      <RegistBackground>
        <RegistContainer>
          <RegistTitle> 복약시간 지정 💊 </RegistTitle>
          <MedicineForm userId={userId}></MedicineForm>
        </RegistContainer>
      </RegistBackground>
    </>
  );
};

export default MedicineRegist;
