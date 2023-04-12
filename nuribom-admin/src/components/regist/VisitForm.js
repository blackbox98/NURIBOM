import moment from "moment";
import React, { useState, useEffect } from "react";
import { registVisit } from "../../api/VisitAPI";
import { useNavigate } from "react-router-dom";
import {
  InputTitle,
  InputBox,
  MedicineRegistForm,
  MedicineButton,
  ButtonBox,
  SelectBox,
} from "./styled";

const VisitForm = (props) => {
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**방문일정 상태관리 */
  const [visit, setVisit] = useState({
    visitDate: "",
    userId: props.userId,
    contents: "",
  });
  /**방문날짜,시간 상태관리 */
  const [visitDate, setVisitDate] = useState({
    date: moment(new Date()).format("YYYY-MM-DD"),
    time: "00:00",
  });
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
    setVisitDate({ ...visitDate, ["date"]: "", ["time"]: "00:00" });
    setVisit({ ...visit, ["contents"]: "" });
  };
  /**방문일정 등록 */
  const submitForm = async () => {
    const response = await registVisit(visit);
    if (response.status === 200 || response.status === 201) {
      alert("방문일정을 등록하였습니다.");
      navigate("/worker/main");
    } else {
      alert("방문일정 등록에 실패했습니다.");
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
      <MedicineRegistForm>
        {/* <div>
          <InputTitle htmlFor="visitName">
            방문할 어르신 댁을 입력해주세요
          </InputTitle>
          <InputBox id="visitName" type="text"></InputBox>
          <SelectBox id="visitName">
        {visits}
      </SelectBox>
        </div> */}
        <div>
          <InputTitle htmlFor="visitTime">
            방문 날짜와 시간을 정해주세요
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
            참고사항이 있다면 작성해주세요
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
          <MedicineButton onClick={() => submitState()}>저장</MedicineButton>
        </ButtonBox>
      </MedicineRegistForm>
    </>
  );
};

export default VisitForm;
