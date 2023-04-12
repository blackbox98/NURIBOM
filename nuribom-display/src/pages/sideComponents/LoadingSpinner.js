import React from "react";

import { LoadingBg, NuriBomLoadingImg } from "../main/styled";

const LoadingSpinner = () => {
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
          src={require("../main/assets/loading.gif")}
        ></NuriBomLoadingImg>
      </div>
    </LoadingBg>
  );
};

export default LoadingSpinner;
