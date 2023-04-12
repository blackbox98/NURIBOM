import React from "react";
import { GameBackground, GameTitle } from "./../main/styled";

const NotCurrectLoading = () => {
  return (
    <GameBackground
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GameTitle style={{width: "70rem"}} src={require("../main/assets/startletter/onemore.png")} />
    </GameBackground>
  );
};

export default NotCurrectLoading;
