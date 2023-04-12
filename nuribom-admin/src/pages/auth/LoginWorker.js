import React from "react";
import {
  InPutTag,
  LoginContainer,
  LoginButton,
  InputTitle,
  LoginWorkerIDPWWrap,
  LoginWorkerID,
  LoginInputTag,
} from "./styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeWorkerLogin,
  storeWorkerLogout,
} from "../../store/reducers/worker";
import { loginWorker, getWorker } from "../../api/AuthAPI";

const LoginWorker = () => {
  /**관리자 상태관리 */
  const [worker, setWorker] = useState({
    workerWebID: "",
    workerWebPW: "",
  });
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**id useRef */
  const idRef = useRef();
  /**pw useRef */
  const pwRef = useRef();
  /**리덕스 갱신 dispatch */
  const dispatch = useDispatch();
  /**리덕스 관리자 정보 */
  const workerData = useSelector((state) => state.worker.value);
  /**중복 로그인 여부 판단 처리 */
  useEffect(() => {
    if (workerData.isLogin) {
      onHandleLogOut();
    }
    if (sessionStorage.getItem("ACESS_TOKEN")) {
      sessionStorage.removeItem("ACESS_TOKEN");
      return;
    }
  }, []);
  /**로그아웃 */
  const onHandleLogOut = () => {
    dispatch(storeWorkerLogout());
    navigate("/worker");
  };
  /**input 입력 */
  const onHandleInput = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };
  /**input 로그인 엔터 */
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      LoginSubmit();
    }
  };
  /**로그인 */
  const LoginSubmit = async () => {
    if (worker.workerWebID.length < 1) {
      alert("아이디를 입력해주세요.");
      idRef.current.focus();
      return;
    }
    if (worker.workerWebPW.length < 1) {
      alert("비밀번호를 입력해주세요.");
      pwRef.current.focus();
      return;
    }
    const request = {
      workerWebId: worker.workerWebID,
      workerWebPwd: worker.workerWebPW,
    };
    const response = await loginWorker(request);
    if (response.data.statusCode === 200) {
      alert("로그인에 성공했습니다!");
    } else if (response.data.statusCode === 404) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      return;
    } else {
      alert(
        "로그인 시도 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요."
      );
    }

    const accessToken = response.headers.authorization;
    sessionStorage.setItem("ACCESS_TOKEN", accessToken);

    const workerData = await getWorker();

    dispatch(storeWorkerLogin({ isLogin: true, data: workerData }));
    navigate("/worker/main");
  };
  return (
    <>
      <LoginContainer>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <InputTitle>보호자 로그인</InputTitle>
          <LoginWorkerIDPWWrap>
            <LoginWorkerID>아이디</LoginWorkerID>
            <LoginInputTag
              name="workerWebID"
              value={worker.workerWebID}
              onChange={onHandleInput}
              onKeyPress={handleOnKeyPress}
              ref={idRef}
            ></LoginInputTag>
          </LoginWorkerIDPWWrap>
          <LoginWorkerIDPWWrap>
            <LoginWorkerID>비밀번호</LoginWorkerID>
            <LoginInputTag
              name="workerWebPW"
              value={worker.workerWebPW}
              type="password"
              onChange={onHandleInput}
              onKeyPress={handleOnKeyPress}
              ref={pwRef}
            ></LoginInputTag>
          </LoginWorkerIDPWWrap>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <LoginButton onClick={LoginSubmit}>로그인</LoginButton>
          </div>
        </div>
      </LoginContainer>
    </>
  );
};

export default LoginWorker;
