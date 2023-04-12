import { useState, useCallback, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAct, getActDetail, getActList } from "../../api/ActAPI";
import {
  DetailCardFormMed,
  DetailCardFormWrap,
  DetailCardTop,
  DetailCardBtm,
  DetailSubmitButton,
  TimeSet,
  MedicineCardFormInner,
  StretchAndSongForm,
  StretchAndSongIconWrap,
  MdCardOverFlow,
} from "./styled";

const SongCard = (props) => {
  const navigate = useNavigate();

  const [userSerialNo, setUser] = useState(props.user);
  const [userSong, setUserSong] = useState();

  const getUserSongData = useCallback(async () => {
    const data = await getActList(userSerialNo);
    setUserSong((prev) => data);
  }, []);

  const onHandleAddSongUser = useCallback(() => {
    navigate(`/worker/songregist/${props.workerId}/${props.userId}`);
  });
  const onHandleDeleteSong = async (songId) => {
    const response = await deleteAct(songId);
    if (response.status === 200 || response.status === 201) {
      alert("노래일정 삭제되었습니다.");
    }
    getUserSongData();
  };
  const onHandleUpdateSong = async (songId) => {
    const response = await getActDetail(songId);
    if (response.status === 200) {
      navigate(`/worker/songupdate/${response.data.userId}/${songId}`, {
        state: response.data,
      });
    }
  };

  useEffect(() => {
    getUserSongData();
  }, []);
  return (
    <>
      <DetailCardFormMed>
        <DetailCardFormWrap>
          <div
            style={{
              display: "flex",
              marginBottom: "1.25rem",
            }}
          >
            <DetailCardTop>노래 재생시간</DetailCardTop>
            <DetailSubmitButton onClick={onHandleAddSongUser}>
              추가
            </DetailSubmitButton>
          </div>
          <DetailCardBtm>
            <MdCardOverFlow>
              {userSong ? (
                userSong.map((song, index) =>
                  song.activity.indexOf("SONG") !== -1 ? (
                    <StretchAndSongForm key={song.id}>
                      <MedicineCardFormInner>
                        <TimeSet>
                          {song.activity_hour > 12
                            ? `${
                                song.activity_hour - 12 < 10
                                  ? `0${song.activity_hour - 12}`
                                  : song.activity_hour - 12
                              }:${song.activity_minutes}` + "PM"
                            : `${
                                song.activity_hour < 10
                                  ? `${song.activity_hour}`
                                  : song.activity_hour
                              }:${song.activity_minutes}` + "AM"}
                        </TimeSet>
                      </MedicineCardFormInner>
                      <StretchAndSongIconWrap>
                        <div>
                          <i
                            className="fa-solid fa-x"
                            onClick={() => onHandleDeleteSong(song.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => onHandleUpdateSong(song.id)}
                          ></i>
                        </div>
                      </StretchAndSongIconWrap>
                    </StretchAndSongForm>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </MdCardOverFlow>
          </DetailCardBtm>
        </DetailCardFormWrap>
      </DetailCardFormMed>
    </>
  );
};

export default SongCard;
