import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RegistUserContainerWrap,
  RegistUserContainer,
  LoginButton,
  BirthSelectTag,
  InfoInPutTag,
  RegistInfoTag,
  RegistInfoTagWrap,
  RegistUserContainerInner,
} from "./styled";
import { signupUser, updateUser } from "../../api/UserAPI";
import Header from "../../components/layout/Header"

const UpdateUser = () => {
  /**useLocation state */
  const { state } = useLocation();
  /**어르신 상태관리 */
  const [user, setUser] = useState({
    userAddress: state.userAddress,
    userBirthDate: state.userBirthDate,
    userBirthMonth: state.userBirthMonth,
    userBirthYear: state.userBirthYear,
    userName: state.userName,
    userProfileImg: state.userProfileImg,
  });
  /**생년월일 상태관리 */
  const [birth, setBrith] = useState({
    year: state.userBirthYear,
    month: state.userBirthMonth,
    day: state.userBirthDate,
  });
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**input 입력 */
  const onHandleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /* 날짜 구하는 부분 시작 */
  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 1920; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(birth.year, birth.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }
  useEffect(() => {
    setUser({
      ...user,
      userBirthYear: birth.year,
      userBirthMonth: birth.month,
      userBirthDate: birth.day,
    });
  }, [birth]);
  /* 날짜 구하는 부분 끝 */
  /**어르신 정보 수정 */
  const submitForm = async () => {
    const response = await updateUser(user, state.id);

    if (response.statusCode === 200 || response.statusCode === 201) {
      alert("어르신 수정이 완료되었습니다.");
      navigate("/worker/main");
    } else {
      alert("어르신 수정에 실패했습니다.");
      navigate("/worker/main");
      return;
    }
  };
  /**어르신 정보 수정 유효성 체크 */
  const submitState = () => {
    // 이름 : 길이 체크
    if (user.userName.length < 2 || user.userName.length > 12) {
      alert("이름은 2글자 이상 12글자 이하여야 합니다.");
      return;
    }
    // 이름 : 유효성 체크
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    if (!nameRegex.test(user.userName)) {
      alert("이름을 올바르게 입력해주세요.");
      return;
    }

    submitForm();
  };
  return (
    <>
    <Header></Header>
      <RegistUserContainer>
        <RegistUserContainerInner>
          <div>
            <RegistUserContainerWrap>어르신 정보수정</RegistUserContainerWrap>
            <RegistInfoTagWrap>
              <RegistInfoTag>성명</RegistInfoTag>
              <InfoInPutTag
                name="userName"
                type="text"
                value={user.userName}
                onChange={onHandleInput}
              ></InfoInPutTag>
            </RegistInfoTagWrap>

            <RegistInfoTagWrap>
              <RegistInfoTag>생년월일</RegistInfoTag>
              <div>
                <BirthSelectTag
                  value={birth.year}
                  onChange={(e) => {
                    setBrith({ ...birth, year: e.target.value });
                  }}
                >
                  <option disabled>연도</option>
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </BirthSelectTag>
                <BirthSelectTag
                  value={birth.month}
                  onChange={(e) => {
                    setBrith({ ...birth, month: e.target.value });
                  }}
                >
                  <option disabled>월</option>
                  {month.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </BirthSelectTag>
                <BirthSelectTag
                  value={birth.day}
                  onChange={(e) => {
                    setBrith({ ...birth, day: e.target.value });
                  }}
                >
                  <option disabled>날짜</option>
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </BirthSelectTag>
              </div>
            </RegistInfoTagWrap>
            <RegistInfoTagWrap>
              <RegistInfoTag>주소</RegistInfoTag>
              <InfoInPutTag
                name="userAddress"
                type="text"
                value={user.userAddress}
                onChange={onHandleInput}
              ></InfoInPutTag>
            </RegistInfoTagWrap>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1.25rem",
              }}
            >
              <LoginButton onClick={submitState}>수정</LoginButton>
            </div>
          </div>
        </RegistUserContainerInner>
      </RegistUserContainer>
    </>
  );
};

export default UpdateUser;
