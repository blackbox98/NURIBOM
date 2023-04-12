import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProfileContainer,
  DetailInfoContainer,
  CardContainer,
  DetailInfoWrap,
  InfoSentence,
  DetailContainer,
  CalendarCardContainer,
  DisplayCenterDetail,
  UserUpdateAndDeleteBtn,
  UserInFoInnerCard,
  UserActivation,
  UserActivationOuter,
  DetailCardTop,
} from "./styled";
import MedicineCard from "./MedicineCard";
import SongCard from "./SongCard";
import StretchCard from "./StretchCard";
import CalendarCard from "./CalendarCard";
import Header from "../../components/layout/Header";
import { deleteUser, getUserDetail, updateUser } from "../../api/UserAPI";
import ProfileCircle from "../../components/profile/ProfileCircle";
import Modal from "../../components/profile/Modal";
import ProfileImageListContent from "../../components/profile/ProfileImageListContent";
import Loading from "../../components/Loading";
import { getUserEmotionList, getUserTodayEmotion } from "../../api/EmotionAPI";
import { format, addMonths, subMonths } from "date-fns";
import { EmotionCalender } from "./../../components/emotioncalendar/EmotionCalender";

const UserDetail = () => {
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**파라미터 변수 */
  const params = useParams();
  /**어르신 상태관리 */
  const [user, setUser] = useState();
  /**프로필 이미지 상태관리 */
  const [profileImgState, setProfileImgState] = useState({
    imgId: user ? user.userProfileImg : "1",
  });
  /**모달 on/off 상태관리 */
  const [modalState, setModalState] = useState(false);
  /**로딩 on/off 상태관리 */
  const [loading, setLoading] = useState(false);
  /**당일 어르신 감정 상태관리 */
  const [todayEmotion, setTodayEmotion] = useState();
  /**어르신 감정목록 상태관리 */
  const [emotionList, setEmotionList] = useState();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  /**모달창 열기 */
  const openModal = () => {
    setModalState(true);
  };
  /**모달창 닫기 */
  const closeModal = () => {
    setModalState(false);
  };
  /**어르신 수정 */
  const submitForm = async () => {
    const requestUser = {
      userAddress: user ? user.userAddress : "",
      userBirthDate: user ? user.userBirthDate : "",
      userBirthMonth: user ? user.userBirthMonth : "",
      userBirthYear: user ? user.userBirthYear : "",
      userName: user ? user.userName : "",
      userProfileImg: user ? user.userProfileImg : "",
    };
    const response = await updateUser(requestUser, user ? user.id : "");
  };
  /**관리자 id useRef */
  const workerId = params.workerId;
  /**어르신 id useRef */
  const userId = params.userId;
  /**어르신 상세정보 조회 */
  const getUserDetailData = useCallback(async () => {
    setLoading(true);
    const data = await getUserDetail(params.userId);
    setUser((prev) => data);
    setLoading(false);
  }, []);
  /**어르신 당일감정정보 조회 */
  const getUserTodayEmotionData = useCallback(async () => {
    setLoading(true);
    // console.log(params.userId);
    const data = await getUserTodayEmotion(params.userId);
    // console.log(data);
    setTodayEmotion((prev) => data);
    setLoading(false);
  }, []);
  /**어르신 감정정보목록 조회 */
  const getUserEmotionListData = useCallback(async () => {
    setLoading(true);
    const data = await getUserEmotionList(params.userId);
    // console.log(data);
    setEmotionList((prev) => data);
    setLoading(false);
  }, []);
  /**프로필 갱신 */
  const onHandleChangeProfileImage = async (profileImageId) => {
    setProfileImgState((prev) => {
      return { ...prev, imgId: profileImageId };
    });

    closeModal();
  };
  useEffect(() => {
    getUserDetailData();
  }, [getUserDetailData]);
  useEffect(() => {
    getUserTodayEmotionData();
  }, [getUserTodayEmotionData]);
  useEffect(() => {
    getUserEmotionListData();
  }, [getUserEmotionListData]);
  useEffect(() => {
    setUser((prev) => {
      return { ...prev, userProfileImg: profileImgState.imgId };
    });
  }, [profileImgState]);
  useEffect(() => {
    if (user && user.userProfileImg) {
      submitForm();
    }
  }, [user]);
  /**어르신 상세정보 수정 */
  const onHandleUpdateUser = () => {
    navigate(`/worker/updateuser/${workerId}/${userId}`, { state: user });
  };
  /** 어르신 사진 업로드 페이지 이동 */
  const onHandleUploadFile = () => {
    navigate(`/worker/uploadfile/${workerId}/${userId}`, { state: user });
  };
  /** 어르신 사진첩 페이지 이동 */
  const onHandlePhoto = () => {
    navigate(`/worker/picandvid/${workerId}/${userId}`, { state: user });
  };
  /**어르신 삭제 */
  const onHandleDeleteUser = async () => {
    if (confirm("유저정보를 삭제하시겠습니까?")) {
      const response = await deleteUser(userId);
      navigate("/worker/main");
    }
  };

  return (
    <>
      <Header></Header>
      <DetailContainer>
        {loading ? <Loading /> : null}
        <div>
          <div style={{ height: "4.5rem" }}></div>
          <ProfileContainer>
            <Modal
              isOpen={modalState}
              width={400}
              modalContent={
                user &&
                user.userProfileImg && (
                  <ProfileImageListContent
                    profileImageState={user ? profileImgState.imgId : "1"}
                    onClick={onHandleChangeProfileImage}
                    close={closeModal}
                  />
                )
              }
            />
            <UserInFoInnerCard>
              <div style={{ display: "flex" }}>
                {user && user.userProfileImg && (
                  <ProfileCircle
                    openModal={openModal}
                    imageId={user ? user.userProfileImg : "1"}
                    width={"8vw"}
                    height={"8vw"}
                  />
                )}
                <DetailInfoWrap>
                  {todayEmotion && (
                    <InfoSentence>
                      {todayEmotion.good >= todayEmotion.normal
                        ? "😆"
                        : todayEmotion.normal >= todayEmotion.bad
                        ? "😃"
                        : "😢"}{" "}
                      {user ? user.userName : ""}
                    </InfoSentence>
                  )}
                  <InfoSentence>
                    🎂 {user ? user.userBirthYear : ""}.
                    {user ? user.userBirthMonth : ""}.
                    {user ? user.userBirthDate : ""}
                  </InfoSentence>
                  <InfoSentence>🏠 {user ? user.userAddress : ""}</InfoSentence>
                </DetailInfoWrap>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <UserUpdateAndDeleteBtn onClick={onHandleDeleteUser}>
                  정보 삭제
                </UserUpdateAndDeleteBtn>
                <UserUpdateAndDeleteBtn onClick={onHandleUpdateUser}>
                  정보 수정
                </UserUpdateAndDeleteBtn>
                <UserUpdateAndDeleteBtn
                  onClick={onHandlePhoto}
                  style={{ width: "60px" }}
                >
                  <i className="fa-solid fa-camera"></i>
                </UserUpdateAndDeleteBtn>
              </div>
            </UserInFoInnerCard>
          </ProfileContainer>

          {/* 보호자 활동량 그래프 들어가는 곳 */}
          <UserActivationOuter>
            <UserActivation>
              <DetailCardTop>어르신 감정 분석</DetailCardTop>
              <EmotionCalender userId={userId} />
            </UserActivation>
          </UserActivationOuter>
          {/* 보호자 활동량 그래프 들어가는 곳 */}

          <div>
            <DetailInfoContainer>
              <DisplayCenterDetail>
                <CardContainer>
                  {user && user.serialNo && userId && (
                    <MedicineCard
                      workerId={workerId}
                      userId={userId}
                      user={user.serialNo}
                    ></MedicineCard>
                  )}
                </CardContainer>

                <CardContainer>
                  {user && user.serialNo && (
                    <SongCard
                      workerId={workerId}
                      userId={userId}
                      user={user.serialNo}
                    ></SongCard>
                  )}
                </CardContainer>

                <CardContainer>
                  {user && user.serialNo && (
                    <StretchCard
                      workerId={workerId}
                      userId={userId}
                      user={user.serialNo}
                    ></StretchCard>
                  )}
                </CardContainer>
              </DisplayCenterDetail>
            </DetailInfoContainer>
          </div>
          <CalendarCardContainer>
            <CalendarCard workerId={workerId} userId={userId}></CalendarCard>
          </CalendarCardContainer>
        </div>
      </DetailContainer>
    </>
  );
};

export default UserDetail;
