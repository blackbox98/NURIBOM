import { useState, useCallback, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteMedication,
  getMedicationDetail,
  getUserMedicationList,
} from "../../api/Medicine";
import {
  DetailCardFormMed,
  DetailCardFormWrap,
  DetailCardTop,
  DetailCardBtm,
  MedicineCardForm,
  DetailSubmitButton,
  DayWeekSelected,
  DayWeekDeselected,
  DayWeekWrap,
  TimeSet,
  AlarmTitle,
  MedicineCardFormInner,
  IconWrap,
  MdCardOverFlow,
} from "./styled";

const MedicineCard = (props) => {
  /**페이지 전환 navigate */
  const navigate = useNavigate();
  /**어르신 복약시간 상태관리 */
  const [userSerialNo, setUser] = useState(props.user);
  const [userMedication, setUserMedication] = useState();

  /**어르신 복약시간 목록 조회 */
  const getUserMedicationData = useCallback(async () => {
    const data = await getUserMedicationList(props.userId);
    setUserMedication((prev) => data);
  }, []);
  /**복약시간 삭제 */
  const onHandleDeleteMedication = useCallback(async (medicationId) => {
    const response = await deleteMedication(medicationId);
    if (response.status === 200 || response.status === 201) {
      alert("복약시간이 삭제되었습니다.");
    }
    getUserMedicationData();
  });
  /**복약시간 수정 */
  const onHandleUpdateMedication = useCallback(async (medicationId) => {
    const response = await getMedicationDetail(medicationId);
    if (response.status === 200) {
      navigate(
        `/worker/medicineupdate/${response.data.id}/${response.data.userId}`,
        {
          state: response.data,
        }
      );
    }
  });
  const onHandleAddMedicineUser = useCallback(() => {
    navigate(`/worker/medicineregist/${props.workerId}/${props.userId}`);
  });
  useEffect(() => {
    getUserMedicationData();
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
            <DetailCardTop>복약시간</DetailCardTop>
            <DetailSubmitButton onClick={onHandleAddMedicineUser}>
              추가
            </DetailSubmitButton>
          </div>
          <DetailCardBtm>
            <MdCardOverFlow>
              {userMedication ? (
                userMedication.map((medication, index) => (
                  <MedicineCardForm key={medication.id}>
                    <MedicineCardFormInner>
                      <AlarmTitle>{medication.medicine}</AlarmTitle>
                      <TimeSet>
                        {medication.medication_hour > 12
                          ? `${
                              medication.medication_hour - 12 < 10
                                ? `0${medication.medication_hour - 12}`
                                : medication.medication_hour - 12
                            }:${medication.medication_minutes}` + "PM"
                          : `${
                              medication.medication_hour < 10
                                ? `${medication.medication_hour}`
                                : medication.medication_hour
                            }:${medication.medication_minutes}` + "AM"}
                      </TimeSet>
                      <DayWeekWrap>
                        {medication.days[0] ? (
                          <DayWeekSelected>일</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>일</DayWeekDeselected>
                        )}
                        {medication.days[1] ? (
                          <DayWeekSelected>월</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>월</DayWeekDeselected>
                        )}
                        {medication.days[2] ? (
                          <DayWeekSelected>화</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>화</DayWeekDeselected>
                        )}
                        {medication.days[3] ? (
                          <DayWeekSelected>수</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>수</DayWeekDeselected>
                        )}
                        {medication.days[4] ? (
                          <DayWeekSelected>목</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>목</DayWeekDeselected>
                        )}
                        {medication.days[5] ? (
                          <DayWeekSelected>금</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>금</DayWeekDeselected>
                        )}
                        {medication.days[6] ? (
                          <DayWeekSelected>토</DayWeekSelected>
                        ) : (
                          <DayWeekDeselected>토</DayWeekDeselected>
                        )}
                      </DayWeekWrap>
                    </MedicineCardFormInner>
                    <IconWrap>
                      <div>
                        <i
                          className="fa-solid fa-x"
                          onClick={() =>
                            onHandleDeleteMedication(medication.id)
                          }
                        ></i>
                      </div>
                      <div>
                        <i
                          className="fa-regular fa-pen-to-square"
                          onClick={() =>
                            onHandleUpdateMedication(medication.id)
                          }
                        ></i>
                      </div>
                    </IconWrap>
                  </MedicineCardForm>
                ))
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

export default memo(MedicineCard);
