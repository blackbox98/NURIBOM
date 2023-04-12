import React, { useState, useEffect, useCallback } from "react";
import {
  RegistBackground,
  NoticeTitle,
  NoticeContents,
  UserCard,
  UserCardCircle,
  UserCardInfos,
  UserCardName,
  UserCardVisit,
  UserCardChecked,
  UserCardNameChecked,
} from "./styled";

import Header from "../../components/layout/Header";
import Loading from "../../components/Loading";
import { checkNotice, deleteNotice, getNotices } from "../../api/NoticeAPI";
// 오늘날짜 계산하는 함수
function numFormat(variable) {
  variable = Number(variable).toString();
  if (Number(variable) < 10 && variable.length == 1) variable = "0" + variable;
  return variable;
}

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let hour = date.getHours();
let min = date.getMinutes();
let dString =
  year.toString() +
  month.toString() +
  numFormat(day).toString() +
  hour.toString() +
  min.toString();
const Notice = () => {
  const NoticeContentsChecked = true;
  const [noticeList, setNoticeList] = useState();
  const [loading, setLoading] = useState(false);
  const getNoticeData = useCallback(async () => {
    setLoading(true);
    const data = await getNotices();

    setNoticeList((prev) => data);
    setLoading(false);
  }, []);
  const onHandleDeleteNotice = async (noticeId) => {
    setLoading(true);
    const response = await deleteNotice(noticeId);

    if (response.status === 200 || response.status === 201) {
      alert("알림이 삭제되었습니다.");
      getNoticeData();
    }
    setLoading(false);
  };
  const onHandleCheckNotice = async (noticeId) => {
    setLoading(true);
    const response = await checkNotice(noticeId);

    if (response.status === 200) {
      alert("알림을 확인하였습니다.");
      getNoticeData();
    }
    setLoading(false);
  };
  useEffect(() => {
    getNoticeData();
    noticeList
      ? noticeList.map((notice, index) => {
          let currentTime =
            dString -
            (notice.createdAt.substr(0, 4).toString() +
              notice.createdAt.substr(5, 2) +
              notice.createdAt.substr(8, 2) +
              notice.createdAt.substr(11, 2) +
              notice.createdAt.substr(14, 2));
          console.log(
            notice.createdAt + "원본",
            notice.createdAt.substr(0, 4).toString() +
              notice.createdAt.substr(5, 2) +
              notice.createdAt.substr(8, 2) +
              notice.createdAt.substr(11, 2) +
              notice.createdAt.substr(14, 2) +
              "개선",
            dString,
            dString -
              (notice.createdAt.substr(0, 4).toString() +
                notice.createdAt.substr(5, 2) +
                notice.createdAt.substr(8, 2) +
                notice.createdAt.substr(11, 2) +
                notice.createdAt.substr(14, 2))
          );
          if (currentTime.toString().length < 4) {
            currentTime = "0" + currentTime.toString();
          }
          if (currentTime.substr(0, 2) - 0 > 72) {
            onHandleDeleteNotice(notice.id);
          } else {
            console.log(currentTime.substr(0, 2) - 0);
            console.log("3일미만");
          }
          console.log(currentTime);
        })
      : console.log("");
  }, []);
  return (
    <>
      <Header></Header>
      {loading ? <Loading /> : null}
      <RegistBackground>
        <div>
          <div style={{ height: "5rem" }}></div>
          <NoticeTitle>알림</NoticeTitle>
          <NoticeContents>
            {noticeList ? (
              noticeList.map((notice, index) =>
                notice.isRead.indexOf("NOT") !== -1 ? (
                  <UserCard key={notice.id}>
                    <UserCardCircle></UserCardCircle>
                    <UserCardInfos>
                      {/* 성함 */}
                      <UserCardName>{notice.userName}님</UserCardName>
                      {/* 방문일정 */}
                      <UserCardVisit>{notice.contents}</UserCardVisit>
                      <UserCardVisit>{notice.createdAt} 생성시간</UserCardVisit>
                    </UserCardInfos>
                    <div>
                      <div>
                        <i
                          className="fa-solid fa-x"
                          onClick={() => onHandleDeleteNotice(notice.id)}
                        ></i>
                      </div>
                      <div>
                        <i
                          className="fa-regular fa-circle-check"
                          onClick={() => onHandleCheckNotice(notice.id)}
                        ></i>
                      </div>
                    </div>
                  </UserCard>
                ) : (
                  <UserCardChecked key={notice.id}>
                    <UserCardCircle></UserCardCircle>
                    <UserCardInfos>
                      {/* 성함 */}
                      <UserCardNameChecked>
                        {notice.userName}님
                      </UserCardNameChecked>
                      {/* 방문일정 */}
                      <UserCardVisit>{notice.createdAt} 생성시간</UserCardVisit>
                    </UserCardInfos>
                    <div>
                      <div>
                        <i
                          className="fa-solid fa-x"
                          onClick={() => onHandleDeleteNotice(notice.id)}
                        ></i>
                      </div>
                      <div>
                        <i
                          className="fa-regular fa-circle-check"
                          onClick={() => onHandleCheckNotice(notice.id)}
                        ></i>
                      </div>
                    </div>
                  </UserCardChecked>
                )
              )
            ) : (
              <></>
            )}
          </NoticeContents>
        </div>
      </RegistBackground>
    </>
  );
};

export default Notice;
