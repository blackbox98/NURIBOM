import React from "react";
import VisitForm from "../../components/regist/VisitForm";
import { useNavigate, useParams } from "react-router-dom";
import { RegistBackground, RegistTitle, RegistContainer } from "./styled";
import { useLocation } from "react-router";
import Header from "../../components/layout/Header"

const VisitRegist = () => {
  // const navigate = useNavigate();
  // const locate = useLocation();
  const params = useParams();
  const userId = params.userId;
  return (
    <>
    <Header></Header>
      <RegistBackground>
        <RegistContainer>
          <RegistTitle> 방문일정 등록 🏡 </RegistTitle>
          <VisitForm userId={userId}></VisitForm>
        </RegistContainer>
      </RegistBackground>
    </>
  );
};

export default VisitRegist;
