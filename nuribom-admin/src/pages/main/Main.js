import { useCallback, useEffect, useState } from "react";
import Worker from "../../components/worker/Worker";
import Users from "../../components/worker/Users";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import {
  MainContainer,
  CallenderContainer,
  UsersContainer,
  AddBtnMain,
} from "../../components/worker/styled";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/UserAPI";
import MainCallender from "./../../components/calendar/MainCallendar";
import { storeWorkerLogin } from "../../store/reducers/worker";
import { getWorker } from "../../api/AuthAPI";
import Loading from "../../components/Loading";

const Main = () => {
  /**리덕스 관리자 정보 */
  const worker = useSelector((state) => state.worker.value);
  /**리덕스 상태정보 갱신 dispatch */
  const dispatch = useDispatch();
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**로딩 상태관리 */
  const [loading, setLoading] = useState(false);
  /**관리자 정보 */
  const workerInfo = {
    img: worker.data.workerProfileImg,
    name: worker.data.workerName,
    worker: worker.data,
  };
  /**어르신 목록 상태관리 */
  const [userList, setUserList] = useState();
  /**어르신 목록 조회 */
  const getUsersData = useCallback(async () => {
    setLoading(true);
    const data = await getUsers();
    setUserList((prev) => data);
    setLoading(false);
  }, []);
  /**관리자 리덕스 상태갱신 */
  const getWorkerUpdate = useCallback(async () => {
    setLoading(true);
    const workerData = await getWorker();
    dispatch(storeWorkerLogin({ isLogin: true, data: workerData }));
    setLoading(false);
  });
  useEffect(() => {
    getUsersData();
    getWorkerUpdate();
  }, []);
  /**어르신 추가 */
  const onHandleAddUser = () => {
    navigate("/worker/registuser");
  };
  // /**어르신 상세정보 페이지 */
  // const onHandleUserDetailPage = (user) => {
  //   if (!user) {
  //     navigate("/worker/main");
  //     return;
  //   } else {
  //     navigate(`/worker/userdetail/${user.workerId}/${user.userId}`, worker);
  //   }
  // };
  return (
    <>
      <Header />
      <Wrapper>
        {loading ? <Loading /> : null}
        <MainContainer>
          <Worker workerName={workerInfo.name} worker={worker}></Worker>

          <CallenderContainer>
            <MainCallender worker={worker} />
          </CallenderContainer>

          <UsersContainer>
            <h2>{workerInfo.name}님이 모시는 어르신</h2>
            {userList ? (
              userList.map((user, index) => (
                <Users
                  key={index}
                  userName={user.userName}
                  user={user}
                  worker={worker}
                ></Users>
              ))
            ) : (
              <></>
            )}
            <AddBtnMain onClick={() => onHandleAddUser()}>추가</AddBtnMain>
          </UsersContainer>
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default Main;
