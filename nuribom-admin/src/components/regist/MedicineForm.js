import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registMedication } from "../../api/Medicine";
import {
  InputTitle,
  InputBox,
  MedicineRegistForm,
  MedicineButton,
  ButtonBox,
  DayInputLabel,
} from "./styled";

const MedicineForm = function (props) {
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**어르신 복약시간 상태관리 */
  const [medication, setMedication] = useState({
    userId: props.userId,
    medication_hour: "00",
    medication_minutes: "00",
    medicine: "",
    mon: false,
    tue: false,
    sat: false,
    wed: false,
    thu: false,
    fri: false,
    sun: false,
  });
  /**시간 상태관리 */
  const [time, setTime] = useState({
    time: "00:00",
  });
  /**input 시간 입력 */
  const onHandleTime = (e) => {
    setTime({ ...time, time: e.target.value });
  };
  /**input 약 이름 입력 */
  const onHandleMedicineName = (e) => {
    setMedication({ ...medication, ["medicine"]: e.target.value });
  };
  /**input 약 복용일 입력 */
  const onHandleMedicineDay = (e) => {
    const checked = e.target.checked ? true : false;
    setMedication({ ...medication, [e.target.name]: checked });
  };
  useEffect(() => {
    setMedication({
      ...medication,
      medication_hour: time.time.substr(0, 2),
      medication_minutes: time.time.substr(3, 5),
    });
  }, [time]);
  /**정보 리셋 */
  const onHandleReset = () => {
    setMedication({
      ...medication,
      ["medication_hour"]: "00",
      ["medication_minutes"]: "00",
      ["medicine"]: "",
      ["mon"]: false,
      ["tue"]: false,
      ["wed"]: false,
      ["thu"]: false,
      ["fri"]: false,
      ["sat"]: false,
      ["sun"]: false,
    });
    setTime({ ...time, ["time"]: "00:00" });
  };
  /**복약시간 등록 */
  const submitForm = async () => {
    const response = await registMedication(medication);
    if (response.status === 200 || response.status === 201) {
      alert("복용시간을 등록하였습니다.");
      navigate("/worker/main");
    } else {
      alert("복용시간 등록에 실패했습니다.");
    }
  };
  /**복약시간 유효성 체크 */
  const submitState = async () => {
    if (medication.medicine.length < 1) {
      alert("복용할 약을 입력해주세요.");
      return;
    }
    submitForm();
  };
  return (
    <>
      <MedicineRegistForm>
        <div>
          <InputTitle htmlFor="medicineName">
            복용할 약의 이름을 적어주세요
          </InputTitle>
          <InputBox
            id="medicineName"
            type="text"
            onChange={onHandleMedicineName}
            value={medication.medicine}
          ></InputBox>
        </div>
        <div>
          <InputTitle htmlFor="medicineTime">복용 시간을 적어주세요</InputTitle>
          <InputBox
            id="medicineTime"
            type="time"
            onChange={onHandleTime}
            value={time.time}
          ></InputBox>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <InputTitle htmlFor="medicineDay">복용 날짜를 적어주세요</InputTitle>
          <div>
            <input
              id="sunday"
              type="checkbox"
              name="sun"
              onChange={onHandleMedicineDay}
              checked={medication.sun ? true : false}
            ></input>
            <DayInputLabel htmlFor="sunday">일요일</DayInputLabel>
            <input
              id="monday"
              type="checkbox"
              name="mon"
              onChange={onHandleMedicineDay}
              checked={medication.mon ? true : false}
            ></input>
            <DayInputLabel htmlFor="monday">월요일</DayInputLabel>
            <input
              id="tuesday"
              type="checkbox"
              name="tue"
              onChange={onHandleMedicineDay}
              checked={medication.tue ? true : false}
            ></input>
            <DayInputLabel htmlFor="tuesday">화요일</DayInputLabel>
            <input
              id="wednesday"
              type="checkbox"
              name="wed"
              onChange={onHandleMedicineDay}
              checked={medication.wed ? true : false}
            ></input>
            <DayInputLabel htmlFor="wednesday">수요일</DayInputLabel>
            <input
              id="thursday"
              type="checkbox"
              name="thu"
              onChange={onHandleMedicineDay}
              checked={medication.thu ? true : false}
            ></input>
            <DayInputLabel htmlFor="thursday">목요일</DayInputLabel>
            <input
              id="friday"
              type="checkbox"
              name="fri"
              onChange={onHandleMedicineDay}
              checked={medication.fri ? true : false}
            ></input>
            <DayInputLabel htmlFor="friday">금요일</DayInputLabel>
            <input
              id="saturday"
              type="checkbox"
              name="sat"
              onChange={onHandleMedicineDay}
              checked={medication.sat ? true : false}
            ></input>
            <DayInputLabel htmlFor="saturday">토요일</DayInputLabel>
          </div>
        </div>
        <ButtonBox>
          <MedicineButton onClick={onHandleReset}>취소</MedicineButton>
          <MedicineButton onClick={submitState}>저장</MedicineButton>
        </ButtonBox>
      </MedicineRegistForm>
    </>
  );
};

export default MedicineForm;
