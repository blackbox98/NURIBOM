import React from "react";
import { GameBackground, GameTitle } from "./../main/styled";

const CurrectLoading = () => {
  return (
    <GameBackground
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GameTitle style={{width: "50rem"}} src={require("../main/assets/startletter/correct.png")} />
    </GameBackground>
  );
};

export default CurrectLoading;
