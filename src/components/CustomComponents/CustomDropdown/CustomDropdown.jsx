import React, { useState, useRef, useEffect } from "react";
import "./CustomDropdown.css"; // Import your CSS file for styling

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("25%"); // Set the initial default value
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    onSelect && onSelect(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleToggleDropdown}>
        {selectedOption}
        <span className={`dropdown-icon ${isOpen ? "up-arrow" : "down-arrow"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
          >
            <path
              d="M0.54628 1.64117C0.244578 1.33947 0.244578 0.850313 0.54628 0.548611C0.848891 0.246 1.33984 0.247044 1.64116 0.55094L6.07978 5.0275C6.86218 5.8166 8.13782 5.8166 8.92022 5.0275L13.3588 0.550941C13.6602 0.247045 14.1511 0.246 14.4537 0.548611C14.7554 0.850313 14.7554 1.33947 14.4537 1.64117L8.91422 7.18068C8.13317 7.96173 6.86683 7.96173 6.08579 7.18068L0.54628 1.64117Z"
              fill="#011627"
              fill-opacity="0.7"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
