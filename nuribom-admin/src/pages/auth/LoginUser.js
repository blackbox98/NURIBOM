import React from "react";
import { useNavigate } from "react-router-dom";
import {
  InPutTag,
  Title,
  LoginContainer,
  StartButton,
  TitleSentence,
  StartButtonWrap,
} from "./styled";

const LoginUser = () => {
  const navigate = useNavigate();

  return (
    <>
      <LoginContainer>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Title src={require("./assets/kologoshd.png")}></Title>
          <TitleSentence>누리봄 관리자 페이지</TitleSentence>
          <StartButtonWrap>
            <StartButton onClick={() => navigate("/worker/loginworker")}>
              기존 보호자 로그인
            </StartButton>
            <StartButton onClick={() => navigate("/worker/registworker")}>
              신규 보호자 회원가입
            </StartButton>
          </StartButtonWrap>
        </div>
      </LoginContainer>
    </>
  );
};

export default LoginUser;
