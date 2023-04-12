import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const authenticated = useSelector((state) => state.worker.value.isLogin);
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/worker/loginworker" {...alert("로그인 후 이용해주세요.")} />
  );
};

export default PrivateRoute;
