import React from "react";
import "../../css/Accounts/Strategy.css";

const Strategy = ({ heading, content, isClicked,onClick,style }) => {
    // console.log("Rendering Strategy:", heading, isClicked);
  return (
    <div className="swift-accounts-strategy" onClick={onClick} >
      <div className="swift-accounts-strategy-content" style={style}>
        <p style={{ fontWeight: 700, fontSize: 13 }}>{heading}</p>
        <p>{content}</p>
      </div>
      {isClicked && (
        <div className="swift-accounts-strategy-delete">Delete</div>
      )}
    </div>
  );
};

export default Strategy;
