import React, { useState, useEffect } from "react";
import MedicineForm from "../../components/regist/MedicineForm";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  RegistBackground,
  RegistTitle,
  RegistContainer,
  InputTitle,
  InputBox,
  ButtonBox,
  MedicineButton,
} from "./styled";
import { registAct, updateAct } from "../../api/ActAPI";
import Header from "../../components/layout/Header"

const UpdateStretch = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const userId = params.userId;
  const [stretch, setStretch] = useState({
    actId: state.id,
    userId: state.userId,
    activity: "STRETCHING",
    activity_hour: state.activity_hour,
    activity_minutes: state.activity_minutes,
  });
  const [time, setTime] = useState({
    time: state.activity_hour + ":" + state.activity_minutes,
  });
  const onHandleTime = (e) => {
    setTime({ ...time, time: e.target.value });
  };
  useEffect(() => {
    setStretch({
      ...stretch,
      activity_hour: time.time.substr(0, 2),
      activity_minutes: time.time.substr(3, 5),
    });
  }, [time]);
  const onHandleReset = () => {
    setStretch({
      ...stretch,
      ["activity_hour"]: state.activity_hour,
      ["activity_minutes"]: state.activity_minutes,
    });
    setTime({
      ...time,
      ["time"]: state.activity_hour + ":" + state.activity_minutes,
    });
  };
  const submitForm = async () => {
    const response = await updateAct(stretch);
    if (response.status === 200 || response.status === 201) {
      alert("체조 시간을 수정하였습니다.");
      navigate("/worker/main");
    } else {
      alert("체조시간 수정에 실패했습니다.");
    }
  };
  return (
    <>
    <Header></Header>
      <RegistBackground>
        <RegistContainer>
          <RegistTitle> 체조시간 지정 </RegistTitle>
          <div>
            <InputBox
              id="medicineTime"
              type="time"
              onChange={onHandleTime}
              value={time.time}
            ></InputBox>
          </div>
          <ButtonBox>
            <MedicineButton onClick={onHandleReset}>취소</MedicineButton>
            <MedicineButton onClick={submitForm}>저장</MedicineButton>
          </ButtonBox>
        </RegistContainer>
      </RegistBackground>
    </>
  );
};

export default UpdateStretch;
