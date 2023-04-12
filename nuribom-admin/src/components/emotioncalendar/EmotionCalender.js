import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { getUserEmotionList } from "../../api/EmotionAPI";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="col col-end">
        <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick, userId }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  /**어르신 감정목록 상태관리 */
  const [emotionList, setEmotionList] = useState();
  /**어르신 감정정보목록 조회 */
  const getUserEmotionListData = useCallback(async () => {
    // setLoading(true);
    const data = await getUserEmotionList(userId);
    // console.log(data);
    setEmotionList((prev) => data);
    // setLoading(false);
  }, []);
  useEffect(() => {
    getUserEmotionListData();
  }, [getUserEmotionListData]);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let formattedEmotionDate = "";
  let todayEmotion = "";
  // console.log(selectedDate);
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      formattedEmotionDate = format(day, "yyyy-MM-dd");
      // console.log(formattedEmotionDate);
      todayEmotion = "";
      emotionList &&
        emotionList.responses.map((emotion, index) => {
          // console.log(formattedEmotionDate);
          // console.log(emotion.emotionHistoryDate);
          // console.log(emotion.emotionHistoryDate === formattedEmotionDate);

          if (emotion.emotionHistoryDate === formattedEmotionDate) {
            todayEmotion =
              emotion.good >= emotion.normal
                ? "😆"
                : emotion.normal >= emotion.bad
                ? "😃"
                : "😢";
          }
        });

      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {todayEmotion}
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="body">{rows}</div>;
};

export const EmotionCalender = ({ userId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  /**어르신 감정목록 상태관리 */
  const [emotionList, setEmotionList] = useState();
  /**어르신 감정정보목록 조회 */
  const getUserEmotionListData = useCallback(async () => {
    // setLoading(true);
    const data = await getUserEmotionList(userId);
    setEmotionList((prev) => data);
    // setLoading(false);
  }, []);
  useEffect(() => {
    getUserEmotionListData();
  }, [getUserEmotionListData]);
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="calendar">
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          userId={userId}
        />
      </div>
      {emotionList &&
        emotionList.responses.map(
          (emotion, index) => (
            <div key={emotion.id}>
              {/* <div>{emotion.emotionHistoryDate}</div>
              <div>{format(selectedDate, "yyyy-MM-dd")}</div> */}
              {emotion.emotionHistoryDate ===
                format(selectedDate, "yyyy-MM-dd") && (
                <div
                  className="todayemotion"
                  style={{ margin: "5%", width: "100%", height: "100%" }}
                >
                  <div>GOOD : {emotion.good}</div>
                  <div>NORMAL : {emotion.normal}</div>
                  <div>BAD : {emotion.bad}</div>
                </div>
              )}
            </div>
          )
          // emotion.emotionHistoryDate === format(selectedDate, "yyyy-MM-dd") && (
          //   <div>
          //     {emotion.good}
          //     {emotion.normal}
          //     {emotion.bad}
          //   </div>
          // );
        )}
      {/* {selectedDate && <div>{format(selectedDate, "yyyy-MM-dd")}</div>} */}
    </div>
  );
};
