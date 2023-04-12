import React, { useCallback, useEffect, useContext} from "react";
import { getUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingBg, NuriBomLoadingImg } from "./styled";
import { storeUserRegist } from "../../store/reducers/user";

const Loading = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getUserData = useCallback(async () => {
    const response = await getUser("test1");
    dispatch(storeUserRegist({ data: response }));
    console.log(response);
    const medication = response.medicationResponses;
    console.log(medication);
    localStorage.setItem("MEDICATION", JSON.stringify(medication));
    navigate("/main");
  });
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <LoadingBg
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <NuriBomLoadingImg
          src={require("./assets/loading.gif")}
        ></NuriBomLoadingImg>
      </div>
    </LoadingBg>
  );
};

export default Loading;
