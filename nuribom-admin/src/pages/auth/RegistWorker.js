import React, { useState, useEffect, useRef } from "react";
import {
  InPutTag,
  LoginInPutTag,
  RegistInputSentence,
  LoginContainer,
  LoginButton,
  PWInPutTag,
  LoginContainerTitle,
  IDDuplicateCheckWrap,
  PwNotValid,
  PwValid,
  PwNotMatch,
  PwMatch,
  DisplayFlexDiv,
  IDDuplicateCheckWrapInner,
  DuplicateCheckButton,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { signupWorker, workerWebIDDuplicateCheck } from "../../api/AuthAPI";
const RegistWorker = () => {
  /**관리자 상태관리 */
  const [worker, setWorker] = useState({
    workerWebID: "",
    workerWebPW: "",
    workerWebPW2: "",
    workerName: "",
    workerPhone: "",
    workerProfileImg: "1",
    workerWebIDChecked: false,
  });
  /**비밀번호 유효성 상태관리 */
  const [valid, setValid] = useState({
    passwordNotValid: false,
    passwordNotMatch: false,
  });
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**관리자 id useRef */
  const workerWebIDConfirmRef = useRef([]);
  /**pw useRef */
  const passwordRef = useRef([]);
  /**input 입력 */
  const onHandleInput = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };
  /**아이디 중복 체크 */
  const onHandleIDDuplicateCheck = async (e) => {
    e.preventDefault();
    if (worker.workerWebIDChecked) {
      alert("중복 확인이 완료된 아이디입니다.");
      return;
    }
    if (worker.workerWebID.length < 1) {
      alert("아이디를 입력해주세요.");
      return;
    }
    const response = await workerWebIDDuplicateCheck(worker.workerWebID);

    if (response.statusCode === 200) {
      const finish = confirm(
        "사용 가능한 아이디입니다. 이 아이디로 가입을 진행하시겠습니까?"
      );
      if (finish) {
        setWorker({ ...worker, ["workerWebIDChecked"]: true });
        workerWebIDConfirmRef.current[0].disabled = true;
        workerWebIDConfirmRef.current[0].style.backgroundColor = "#f0f0f0";
      }
    } else if (response.statusCode === 401) {
      alert("이미 가입된 아이디입니다.");
    } else {
      alert("오류가 발생했습니다.");
    }
  };
  /**비밀번호 유효성 체크 */
  const workerWebPWRegex =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/i;
  /**비밀번호 유효성 체크 */
  const workerWebPWCheck = (e) => {
    onHandleInput(e);

    if (!workerWebPWRegex.test(worker.workerWebPW)) {
      setValid({ ...valid, passwordNotMatch: false });
      setValid({ ...valid, passwordNotValid: true });
    } else {
      setValid({ ...valid, passwordNotMatch: false });
      setValid({ ...valid, passwordNotValid: false });
    }
  };

  /** 비밀번호, 비밀번호재입력 일치 체크 */
  const workerWebPWMatch = (e) => {
    onHandleInput(e);

    if (worker.workerWebPW !== worker.workerWebPW2) {
      setValid({ ...valid, passwordNotValid: false });
      setValid({ ...valid, passwordNotMatch: true });
    } else {
      setValid({ ...valid, passwordNotValid: false });
      setValid({ ...valid, passwordNotMatch: false });
    }
  };
  /**관리자 회원가입 */
  const submitForm = async () => {
    const request = {
      workerWebId: worker.workerWebID,
      workerWebPwd: worker.workerWebPW,
      workerName: worker.workerName,
      workerPhone: worker.workerPhone,
      workerProfileImg: "1",
    };

    const response = await signupWorker(request);
    if (response.statusCode === 200 || response.statusCode === 201) {
      alert("회원가입이 완료되었습니다.");
      navigate("/worker");
    } else {
      alert("회원가입에 실패했습니다.");
      return;
    }
  };
  /**관리자 등록 유효성 체크 */
  const submitState = async () => {
    // 아이디 : 길이 체크
    if (!worker.workerWebIDChecked) {
      alert("아이디를 다시 확인해주세요.");
      return;
    }
    // 이름 : 길이 체크
    if (worker.workerName.length < 2 || worker.workerName.length > 12) {
      alert("이름은 2글자 이상 12글자 이하여야 합니다.");
      return;
    }
    // 이름 : 유효성 체크
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    if (!nameRegex.test(worker.workerName)) {
      alert("이름을 올바르게 입력해주세요.");
      return;
    }
    //휴대폰 번호 : 길이 체크
    if (worker.workerPhone.length !== 11) {
      alert("휴대폰 번호의 길이를 확인해주세요.");
      return;
    }
    //휴대폰 번호 : 유효성 체크
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(worker.workerPhone)) {
      alert("휴대폰 번호를 올바르게 입력해주세요.");
      return;
    }
    submitForm();
  };
  return (
    <>
      <LoginContainer>
        <div>
          {/* 신규 보호자 회원가입 wrap */}
          <LoginContainerTitle>신규 보호자 회원가입</LoginContainerTitle>
          {/* 신규 보호자 회원가입 wrap */}

          {/* 아이디를 적어주세요 wrap */}
          <RegistInputSentence>👤 아이디를 적어주세요</RegistInputSentence>

          <DisplayFlexDiv onSubmit={onHandleIDDuplicateCheck}>
            <IDDuplicateCheckWrapInner>
              <LoginInPutTag
                name="workerWebID"
                type="text"
                value={worker.workerWebID}
                onChange={onHandleInput}
                ref={(el) => (workerWebIDConfirmRef.current[0] = el)}
              ></LoginInPutTag>
              <DuplicateCheckButton>중복검사</DuplicateCheckButton>
            </IDDuplicateCheckWrapInner>

            <IDDuplicateCheckWrap>
              아이디 중복검사를 진행해주세요
            </IDDuplicateCheckWrap>
          </DisplayFlexDiv>

          {/* 아이디를 적어주세요 wrap */}

          {/* 비밀번호를 입력해주세요 wrap */}
          <RegistInputSentence>
            🗝️ [비밀번호 입력] 비밀번호를 입력해주세요
          </RegistInputSentence>
          <DisplayFlexDiv>
            <PWInPutTag
              name="workerWebPW"
              type="password"
              value={worker.workerWebPW}
              onChange={workerWebPWCheck}
              onKeyUp={workerWebPWCheck}
              ref={(el) => (passwordRef.current[0] = el)}
            ></PWInPutTag>
            {valid.passwordNotValid ? (
              <PwNotValid>
                {" "}
                비밀번호는 8~12자 사이의 영문+숫자+특수문자를 포함해야 합니다.
              </PwNotValid>
            ) : (
              <PwValid> 조건에 맞게 비밀번호를 입력하셨습니다</PwValid>
            )}
          </DisplayFlexDiv>
          {/* 비밀번호를 입력해주세요 wrap */}

          {/* 비밀번호를 입력해주세요 wrap */}
          <RegistInputSentence>
            🗝️ [비밀번호 확인] 비밀번호를 한 번 더 입력해주세요
          </RegistInputSentence>
          <DisplayFlexDiv>
            <PWInPutTag
              name="workerWebPW2"
              type="password"
              value={worker.workerWebPW2}
              onChange={workerWebPWMatch}
              onKeyUp={workerWebPWMatch}
              ref={(el) => (passwordRef.current[1] = el)}
            ></PWInPutTag>
            {valid.passwordNotMatch ? (
              <PwNotMatch> 비밀번호가 일치하지 않습니다</PwNotMatch>
            ) : (
              <PwMatch> 비밀번호가 일치합니다</PwMatch>
            )}
          </DisplayFlexDiv>
          {/* 비밀번호를 입력해주세요 wrap */}

          {/* 이름을 입력해주세요 wrap */}
          <RegistInputSentence>🙂 이름을 입력해주세요</RegistInputSentence>
          <DisplayFlexDiv>
            <InPutTag
              name="workerName"
              type="text"
              value={worker.workerName}
              onChange={onHandleInput}
              style={{
                marginTop: "0.625rem",
              }}
            ></InPutTag>
          </DisplayFlexDiv>
          {/* 이름을 입력해주세요 wrap */}

          {/* 전화번호를 입력해주세요 wrap */}
          <RegistInputSentence>📞 전화번호를 입력해주세요</RegistInputSentence>
          <DisplayFlexDiv>
            <InPutTag
              name="workerPhone"
              placeholder="하이픈 (-) 없이 입력해주세요  ex) 01012341234"
              type="text"
              value={worker.workerPhone}
              onChange={onHandleInput}
              style={{
                marginTop: "0.625rem",
              }}
            ></InPutTag>
          </DisplayFlexDiv>
          {/* 전화번호를 입력해주세요 wrap */}

          {/* 추가 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2.5rem",
            }}
          >
            <LoginButton onClick={submitState}>추가</LoginButton>
          </div>
          {/* 추가 버튼 */}
        </div>
      </LoginContainer>
    </>
  );
};

export default RegistWorker;
