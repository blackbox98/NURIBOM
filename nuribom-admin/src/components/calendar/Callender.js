import { useState, useEffect, useCallback, memo } from "react";
import Calendar from "react-calendar";
import {
  CalendarWrap,
  CalendarSide,
  MedicineCardFormChecked,
  MedicineCardFormDeChecked,
  MedicineCardInner,
  IconWrap,
  CallenderCardOuter,
  CalendarSideInner,
} from "./styled";
import "./Calendar.css";
import {
  deleteVisit,
  getUserVisitList,
  getVisitDetail,
  visitCheck,
} from "../../api/VisitAPI";
import { useNavigate } from "react-router-dom";

const Callender = (props) => {
  /**날짜 상태관리 */
  const [date, setDate] = useState(new Date());
  /**어르신 방문일정 목록 상태관리 */
  const [userVisit, setUserVisit] = useState();
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**날짜 포맷 moment */
  const moment = require("moment");

  /**유저 방문일정 목록 조회 */
  const getUserVisitData = useCallback(async () => {
    const data = await getUserVisitList(props.userId);

    setUserVisit((prev) => data);
  }, []);
  /**유정 방문일정 확인 체크 */
  const onHandleVisitCheck = async (visitId) => {
    const response = await visitCheck(visitId);

    if (response.status === 200 || response.status === 201) {
      alert("방문체크 확인되었습니다.");
    }
    getUserVisitData();
  };
  /**유저 방문일정 삭제 */
  const onHandleDeleteVisit = async (visitId) => {
    const response = await deleteVisit(visitId);

    if (response.status === 200 || response.status === 201) {
      alert("방문일정 삭제되었습니다.");
    }
    getUserVisitData();
  };
  /**유저 방문일정 수정 */
  const onHandleUpdateVisit = async (visitId) => {
    const response = await getVisitDetail(visitId);

    if (response.status === 200) {
      navigate(
        `/worker/visitupdate/${response.data.workerId}/${response.data.userId}`,
        { state: response.data }
      );
    }
  };
  useEffect(() => {
    getUserVisitData();
  }, []);

  return (
    <>
      <CalendarWrap>
        <Calendar
          className="calendar"
          onChange={setDate}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        ></Calendar>
      </CalendarWrap>
      <CalendarSide>
        <CalendarSideInner>
          {moment(date).format("MM")}월 {moment(date).format("DD")}일 일정
        </CalendarSideInner>
        <CallenderCardOuter>
          <div>
            {userVisit ? (
              userVisit.map((visit, index) =>
                visit.visitDate
                  .substr(0, 11)
                  .indexOf(moment(date).format("YYYY-MM-DD")) !== -1 ? (
                  visit.isVisited.indexOf("UN") === -1 ? (
                    <MedicineCardFormChecked key={visit.id}>
                      <div>
                        <h4 style={{marginTop: "0"}}>{visit.visitDate}</h4>
                        <MedicineCardInner>{visit.contents}</MedicineCardInner>
                      </div>
                      <IconWrap>
                        <div>
                          <i
                            className="fa-solid fa-x"
                            onClick={() => onHandleDeleteVisit(visit.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => onHandleUpdateVisit(visit.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-circle-check"
                            onClick={() => onHandleVisitCheck(visit.id)}
                          ></i>
                        </div>
                      </IconWrap>
                    </MedicineCardFormChecked>
                  ) : (
                    <MedicineCardFormDeChecked key={visit.id}>
                      <div>
                        <h4 style={{marginTop: "0"}}>{visit.visitDate}</h4>
                        <MedicineCardInner>{visit.contents}</MedicineCardInner>
                      </div>
                      <IconWrap>
                        <div>
                          <i
                            className="fa-solid fa-x"
                            onClick={() => onHandleDeleteVisit(visit.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => onHandleUpdateVisit(visit.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-circle-check"
                            onClick={() => onHandleVisitCheck(visit.id)}
                          ></i>
                        </div>
                      </IconWrap>
                    </MedicineCardFormDeChecked>
                  )
                ) : (
                  <></>
                )
              )
            ) : (
              <></>
            )}
          </div>
        </CallenderCardOuter>
      </CalendarSide>
    </>
  );
};

export default memo(Callender);
