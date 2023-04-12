import { memo, useCallback } from "react";
import {
  DetailCardFormCal,
  DetailCardTop,
  DetailCardFormWrap,
  DetailSubmitButton,
  DetailCardBtm,
} from "./styled";
import Calendar from "../../components/calendar/Callender";
import { useNavigate } from "react-router-dom";

const CalanderCard = (props) => {
  const navigate = useNavigate();
  const onHandleAddVisitUser = useCallback(() => {
    navigate(`/worker/visitregist/${props.workerId}/${props.userId}`);
  });
  return (
    <>
      <DetailCardFormCal>
        <DetailCardFormWrap>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <DetailCardTop>일정 📆</DetailCardTop>
            <DetailSubmitButton onClick={onHandleAddVisitUser}>
              추가
            </DetailSubmitButton>
          </div>
          <DetailCardBtm>
            <Calendar
              workerId={props.workerId}
              userId={props.userId}
            ></Calendar>
          </DetailCardBtm>
        </DetailCardFormWrap>
      </DetailCardFormCal>
    </>
  );
};

export default memo(CalanderCard);
