import React, { useState, useCallback, useEffect } from "react";
import { getWorker, updateWorker } from "../../api/AuthAPI";
import Modal from "../profile/Modal";
import ProfileCircle from "../profile/ProfileCircle";
import ProfileImageListContent from "../profile/ProfileImageListContent";
import { ProfileContainer, WorkerName, DetailCircle } from "./styled";
import { useDispatch } from "react-redux";
import { storeWorkerLogin } from "../../store/reducers/worker";

const WorkerProfile = function (props) {
  // console.log(props.worker);
  const [modalState, setModalState] = useState(false);
  const [worker, setWorker] = useState({
    workerName: props.worker.data.workerName,
    workerPhone: props.worker.data.workerPhone,
    workerProfileImg: props.worker.data.workerProfileImg,
  });
  const [profileImgState, setProfileImgState] = useState({
    imgId: props.worker.data.workerProfileImg,
  });
  const dispatch = useDispatch();
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const submitForm = async () => {
    const response = await updateWorker(worker);
    // console.log(response);
    getWorkerUpdate();
  };
  const onHandleChangeProfileImage = async (profileImageId) => {
    setProfileImgState((prev) => {
      return { ...prev, imgId: profileImageId };
    });

    closeModal();
  };
  const getWorkerUpdate = useCallback(async () => {
    const workerData = await getWorker();
    dispatch(storeWorkerLogin({ isLogin: true, data: workerData }));
  });
  useEffect(() => {
    // console.log(profileImgState.imgId);
    setWorker((prev) => {
      return { ...prev, workerProfileImg: profileImgState.imgId };
    });
  }, [profileImgState]);
  useEffect(() => {
    // console.log(worker);
    submitForm();
  }, [worker]);
  return (
    <>
      <ProfileContainer>
        {/* <DetailCircle></DetailCircle> */}
        <Modal
          isOpen={modalState}
          width={400}
          modalContent={
            <ProfileImageListContent
              profileImageState={profileImgState.imgId}
              onClick={onHandleChangeProfileImage}
              close={closeModal}
            />
          }
        />
        <ProfileCircle
          openModal={openModal}
          imageId={profileImgState.imgId}
          width={"8vw"}
          height={"8vw"}
        />
        <div>
          <WorkerName>{props.workerName} </WorkerName>
          보호자님
        </div>
      </ProfileContainer>
    </>
  );
};

export default WorkerProfile;
