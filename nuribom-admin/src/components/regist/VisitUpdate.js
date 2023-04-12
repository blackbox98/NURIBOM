import moment from "moment";
import React, { useState, useEffect } from "react";
import { registVisit, updateVisit } from "../../api/VisitAPI";
import { useNavigate, useLocation } from "react-router-dom";
import {
  InputTitle,
  InputBox,
  MedicineRegistForm,
  MedicineButton,
  ButtonBox,
  RegistBackground,
  RegistContainer,
  RegistTitle,
} from "./styled";

const VisitUpdate = (props) => {
  /**useLocation state */
  const { state } = useLocation();
  /**방문일정 상태관리 */
  const [visit, setVisit] = useState({
    visitDate: state.visitDate,
    contents: state.contents,
    visitId: state.id,
  });
  /**방문날짜,시간 상태관리 */
  const [visitDate, setVisitDate] = useState({
    date: moment(state.visitDate.substr(0, 10)).format("YYYY-MM-DD"),
    time: state.visitDate.substr(11, 16),
  });
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**input 날짜 입력 */
  const onHandleDate = (e) => {
    setVisitDate({
      ...visitDate,
      date: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };
  /**input 시간 입력 */
  const onHandleTime = (e) => {
    setVisitDate({ ...visitDate, time: e.target.value });
  };
  /**input 내용 입력 */
  const onHandleContents = (e) => {
    setVisit({ ...visit, ["contents"]: e.target.value });
  };
  /**정보 리셋 */
  const onHandleReset = () => {
    setVisitDate({
      ...visitDate,
      ["date"]: moment(state.visitDate.substr(0, 10)).format("YYYY-MM-DD"),
      ["time"]: state.visitDate.substr(11, 16),
    });
    setVisit({ ...visit, ["contents"]: state.contents });
  };
  /**방문일정 수정 */
  const submitForm = async () => {
    const response = await updateVisit(visit);
    if (response.status === 200 || response.status === 201) {
      alert("방문일정을 수정하였습니다.");
      navigate("/worker/main");
    } else {
      alert("방문일정 수정에 실패했습니다.");
    }
  };
  useEffect(() => {
    setVisit({
      ...visit,
      visitDate: visitDate.date + " " + visitDate.time,
    });
  }, [visitDate]);
  /**방문일정 유효성 체크 */
  const submitState = async () => {
    if (visit.visitDate.length !== 16) {
      alert("방문 날짜와 시간을 정해주세요.");
      return;
    }
    submitForm();
  };
  return (
    <>
      <RegistBackground>
        <RegistContainer>
          <RegistTitle> 방문일정 수정 🏡 </RegistTitle>
          <MedicineRegistForm>
            <div>
              <InputTitle htmlFor="visitTime">
                수정할 방문 날짜와 시간을 정해주세요
              </InputTitle>
              <InputBox
                id="visitTime"
                type="date"
                onChange={onHandleDate}
                value={visitDate.date}
              ></InputBox>
              <InputBox
                id="visitTime"
                type="time"
                onChange={onHandleTime}
                value={visitDate.time}
              ></InputBox>
            </div>
            <div>
              <InputTitle htmlFor="visitTime">
                참고사항 변동이 있다면 수정해주세요
              </InputTitle>
              <InputBox
                id="visitTime"
                type="textarea"
                style={{ height: "10vh" }}
                value={visit.contents}
                onChange={onHandleContents}
              ></InputBox>
            </div>

            <ButtonBox>
              <MedicineButton onClick={onHandleReset}>취소</MedicineButton>
              <MedicineButton onClick={() => submitState()}>
                저장
              </MedicineButton>
            </ButtonBox>
          </MedicineRegistForm>
        </RegistContainer>
      </RegistBackground>
    </>
  );
};

export default VisitUpdate;
