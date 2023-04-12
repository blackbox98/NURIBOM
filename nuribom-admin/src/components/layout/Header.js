import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { storeWorkerLogout } from "../../store/reducers/worker";
import Loading from "../Loading";
import { getNotices } from "../../api/NoticeAPI";

const Common = styled.div`
  padding-left: 2rem;
  padding-right: 4rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.7);
  height: 4.5rem;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;

  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 4rem;
    right: 1%;
    margin-right: -20%;
    right: 1%;
    margin-right: -20%;
  }
`;
const ImgWrapper = styled.img`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: pointer;
  margin-right: 1rem;
  @media screen and (max-width: 500px) {
    position: fixed;
    width: 3rem;
    height: 3rem;
    margin-right: 0.8rem;
    padding-right: 22rem;
  }
  @media screen and (max-width: 410px) {
    padding-left: 15%;
  }
  @media screen and (max-width: 390px) {
    padding-left: 20%;
  }
`;
const NavbarItemList = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
    padding-top: 2rem;
    background-color: white;
    position: absolute;
    right: ${({ menu }) => {
      return menu ? "-10%" : "-150%";
    }};
    transition: 1s all;
    margin-left: -2rem;
    padding-left: 13rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  }
`;
const NicknameItem = styled.a`
  &:hover {
    transform: scale(1.2);
  }
  cursor: pointer;

  margin-right: 5rem;
  padding-right: 3rem;
  font-size: 1.1rem;

  text-decoration: none;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 1150px) {
    margin-right: 3rem;
  }
  @media screen and (max-width: 1050px) {
    margin-right: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 900px) {
    margin-right: 1rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 750px) {
    margin-right: 1.5rem;
    padding-right: 1rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 595px) {
    margin-right: 0.5rem;
    padding-right: 1rem;
    font-size: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const NavItem = styled.a`
  &:hover {
    transform: scale(1.2);
  }
  cursor: pointer;

  margin-right: 5rem;
  padding-right: 3rem;
  font-size: 1.1rem;

  text-decoration: none;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 1150px) {
    margin-right: 3rem;
  }
  @media screen and (max-width: 1050px) {
    margin-right: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 900px) {
    margin-right: 2rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 750px) {
    margin-right: 1.5rem;
    padding-right: 1.5rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 630px) {
    margin-right: 1.5rem;
    padding-right: 1rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 595px) {
    margin-right: 2rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    font-size: 0.5rem;
  }
  @media screen and (max-width: 540px) {
    margin-right: 1rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    font-size: 0.5rem;
  }
  @media screen and (max-width: 500px) {
    margin-right: 5rem;
    font-size: 1.1rem;
    text-align: right;
    margin-bottom: 3rem;
    padding-right: 4rem;
    padding-left: 12rem;
    width: 6rem;
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentNoticeLength, setCurrentNoticeLength] = useState();
  const [noticeList, setNoticeList] = useState();
  const [loading, setLoading] = useState(false);
  const getNoticeData = useCallback(async () => {
    setLoading(true);
    const data = await getNotices();
    setNoticeList((prev) => data);
    setLoading(false);
  }, []);
  const worker = useSelector((state) => state.worker.value);
  const currWorkerisLogin = worker.isLogin;
  const loginWorker = worker.data ? worker.data : "";
  const name = loginWorker.workerName ? loginWorker.workerName : "";
  const updateNoticeLength = useCallback(() => {
    let length = 0;
    if (noticeList) {
      noticeList.map((notice) => {
        if (notice.isRead.indexOf("NOT") !== -1) {
          length = length + 1;
        }
      });
    }
    setCurrentNoticeLength((prev) => length);
  });
  const onHandleLogOut = () => {
    dispatch(storeWorkerLogout());
    navigate("/worker");
  };
  useEffect(() => {
    getNoticeData();
  }, []);
  useEffect(() => {
    updateNoticeLength();
  }, [updateNoticeLength]);
  return (
    <>
      <Common>
        {loading ? <Loading /> : null}
        <LogoWrapper>
          <ImgWrapper
            onClick={() => navigate("/worker/main")}
            width="3rem"
            height="3rem"
            src={`${process.env.PUBLIC_URL}/assets/nuribomLogo.png`}
          ></ImgWrapper>
          <h2>누리:봄</h2>
        </LogoWrapper>
        <NavbarItemList>
          {currWorkerisLogin ? (
            <>
              <NicknameItem>{name ? name : ""} 님</NicknameItem>
              <NavItem
                onClick={() => navigate(`/worker/notice/${worker.data.id}`)}
              >
                알림 {currentNoticeLength ? currentNoticeLength : 0}
              </NavItem>
              <NavItem onClick={() => onHandleLogOut()}>로그아웃</NavItem>
            </>
          ) : (
            <></>
          )}
        </NavbarItemList>
      </Common>
    </>
  );
};

export default Header;
