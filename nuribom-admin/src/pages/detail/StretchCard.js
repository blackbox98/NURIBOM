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

const StretchCard = (props) => {
  const navigate = useNavigate();

  const [userSerialNo, setUser] = useState(props.user);
  const [userStretch, setUserStretch] = useState();

  const getUserStretchData = useCallback(async () => {
    const data = await getActList(userSerialNo);
    setUserStretch((prev) => data);
  }, []);
  const onHandleAddStretchUser = useCallback(() => {
    navigate(`/worker/stretchregist/${props.workerId}/${props.userId}`);
  });
  const onHandleDeleteStretch = async (stretchId) => {
    const response = await deleteAct(stretchId);
    if (response.status === 200 || response.status === 201) {
      alert("체조일정 삭제되었습니다.");
    }
    getUserStretchData();
  };
  const onHandleUpdateStretch = async (stretchId) => {
    const response = await getActDetail(stretchId);
    if (response.status === 200) {
      navigate(`/worker/stretchupdate/${response.data.userId}/${stretchId}`, {
        state: response.data,
      });
    }
  };

  useEffect(() => {
    getUserStretchData();
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
            <DetailCardTop>체조 권유시간</DetailCardTop>
            <DetailSubmitButton onClick={onHandleAddStretchUser}>
              추가
            </DetailSubmitButton>
          </div>
          <DetailCardBtm>
            <MdCardOverFlow>
              {userStretch ? (
                userStretch.map((stretch, index) =>
                  stretch.activity.indexOf("STRETCHING") !== -1 ? (
                    <StretchAndSongForm key={stretch.id}>
                      <MedicineCardFormInner>
                        <TimeSet>
                          {stretch.activity_hour > 12
                            ? `${
                                stretch.activity_hour - 12 < 10
                                  ? `0${stretch.activity_hour - 12}`
                                  : stretch.activity_hour - 12
                              }:${stretch.activity_minutes}` + "PM"
                            : `${
                                stretch.activity_hour < 10
                                  ? `${stretch.activity_hour}`
                                  : stretch.activity_hour
                              }:${stretch.activity_minutes}` + "AM"}
                        </TimeSet>
                      </MedicineCardFormInner>
                      <StretchAndSongIconWrap>
                        <div>
                          <i
                            className="fa-solid fa-x"
                            onClick={() => onHandleDeleteStretch(stretch.id)}
                          ></i>
                        </div>
                        <div>
                          <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => onHandleUpdateStretch(stretch.id)}
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
              {/* <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm>
              <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm>
              <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm>
              <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm>
              <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm>
              <StretchAndSongForm>
                <MedicineCardFormInner>
                  <TimeSet>00:00 AM</TimeSet>
                </MedicineCardFormInner>
                <StretchAndSongIconWrap>
                  <div>
                    <i className="fa-solid fa-x"></i>
                  </div>
                  <div>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </div>
                </StretchAndSongIconWrap>
              </StretchAndSongForm> */}
            </MdCardOverFlow>
          </DetailCardBtm>
        </DetailCardFormWrap>
      </DetailCardFormMed>
    </>
  );
};

export default StretchCard;
