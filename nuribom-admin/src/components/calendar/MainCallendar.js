import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import {
  CalendarWrap,
  CalendarSideMain,
  MedicineCardFormChecked,
  MedicineCardFormDeChecked,
  MainMedicineCardInner,
  IconWrap,
  MedicineCardOuter,
  CalendarSideInner,
} from "./styled";
import "./Calendar.css";
import { deleteVisit, getVisitDetail, visitCheck } from "../../api/VisitAPI";
import { getUserDetail } from "../../api/UserAPI";
import { getWorker } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";

const CardFormChecked = false;

const MainCallender = () => {
  /**날짜 상태관리 */
  const [date, setDate] = useState(new Date());
  /**관리자 방문일정 목록 상태관리 */
  const [workerVisit, setWorkerVisit] = useState();
  /**현재 날짜 방문일정 개수 상태관리 */
  const [todayVisitLength, setTodayVisitLength] = useState();
  /**날짜 포맷 moment */
  const moment = require("moment");
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**관리자 방문일정 목록 조회 */
  const getWorkerVisitData = useCallback(async () => {
    const worker = await getWorker();
    const data = worker.visitResponses;
    setWorkerVisit((prev) => data);
  }, []);
  /**방문일정 개수 갱신 */
  const updateVisitLength = useCallback(() => {
    let length = 0;
    if (workerVisit) {
      workerVisit.map((visit) => {
        if (
          visit.visitDate
            .substr(0, 11)
            .indexOf(moment(date).format("YYYY-MM-DD")) !== -1 &&
          visit.isVisited.indexOf("UN") !== -1
        ) {
          length = length + 1;
        }
      });
    }
    setTodayVisitLength((prev) => length);
  });
  /**방문일정 확인 체크 */
  const onHandleVisitCheck = async (visitId) => {
    const response = await visitCheck(visitId);
    if (response.status === 200 || response.status === 201) {
      alert("방문체크 확인되었습니다.");
    }
    getWorkerVisitData();
  };
  /**방문일정 삭제 */
  const onHandleDeleteVisit = async (visitId) => {
    const response = await deleteVisit(visitId);
    if (response.status === 200 || response.status === 201) {
      alert("방문일정 삭제되었습니다.");
    }
    getWorkerVisitData();
  };
  /**방문일정 수정 */
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
    getWorkerVisitData();
  }, []);
  useEffect(() => {
    updateVisitLength();
  }, [updateVisitLength]);
  useEffect(() => {
    // console.log(moment(date).format("YYYY-MM-DD"));
  }, [date]);
  return (
    <>
      <h2>오늘은 {todayVisitLength}개의 방문일정이 있어요</h2>
      <CalendarWrap>
        <Calendar
          className="calendar"
          onChange={setDate}
          value={date}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        />
      </CalendarWrap>
      <CalendarSideMain>
        <CalendarSideInner>
          {moment(date).format("MM")}월 {moment(date).format("DD")}일 일정
        </CalendarSideInner>
        <MedicineCardOuter>
          <div>
            {workerVisit ? (
              workerVisit.map((visit, index) =>
                visit.visitDate
                  .substr(0, 11)
                  .indexOf(moment(date).format("YYYY-MM-DD")) !== -1 ? (
                  visit.isVisited.indexOf("UN") === -1 ? (
                    <MedicineCardFormChecked key={visit.id}>
                      <div>
                        <h4 style={{marginTop: "0"}}>{visit.userName}</h4>
                        <MainMedicineCardInner>{visit.contents}</MainMedicineCardInner>
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
                        <h4 style={{marginTop: "0"}}>{visit.userName}</h4>
                        <MainMedicineCardInner>{visit.contents}</MainMedicineCardInner>
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
        </MedicineCardOuter>
      </CalendarSideMain>
    </>
  );
};

export default MainCallender;
