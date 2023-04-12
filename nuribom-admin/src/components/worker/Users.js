import { useState, useCallback, useEffect, memo } from "react";
import { getUserDetail } from "../../api/UserAPI";
import ProfileCircle from "../profile/ProfileCircle";
import { useNavigate } from "react-router-dom";
import { UserCard, UserCardInfos, UserCardName, UserCardVisit } from "./styled";
import Loading from "../Loading";

const AssignedUser = function (props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  /**어르신 상세정보 페이지 */
  const onHandleUserDetailPage = useCallback((user) => {
    if (!user) {
      navigate("/worker/main");
      return;
    } else {
      navigate(
        `/worker/userdetail/${user.workerId}/${user.userId}`,
        props.worker
      );
    }
  });
  const getUserDetailData = useCallback(async () => {
    setLoading(true);
    const data = await getUserDetail(props.user.userId);
    setUser((prev) => data);
    setLoading(false);
  }, []);
  useEffect(() => {
    getUserDetailData();
  }, []);
  return (
    <UserCard onClick={() => onHandleUserDetailPage(props.user)}>
      {loading ? <Loading /> : null}
      {/* <UserCardCircle ></UserCardCircle> */}
      <ProfileCircle
        imageId={user ? user.userProfileImg : "1"}
        width={"5vw"}
        height={"5vw"}
      />
      <UserCardInfos>
        {/* 성함 */}
        <UserCardName>{user ? user.userName : ""}님</UserCardName>
        {/* 방문일정 */}
        <UserCardVisit>최근 방문일 {user ? user.lastVisit : ""}</UserCardVisit>
      </UserCardInfos>
    </UserCard>
  );
};

export default memo(AssignedUser);
