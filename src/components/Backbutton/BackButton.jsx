import React from "react";
import { useNavigate } from "react-router-dom";
import "../Backbutton/BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="backButton-div">
      <div className="backButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="25"
          viewBox="0 0 15 25"
          fill="none"
          onClick={goBack}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.1497 23.3493L12.5012 25L0 12.5011L12.5012 0L14.1519 1.65072L3.30159 12.5011L14.1497 23.3493Z"
            fill="#011627"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default BackButton;
