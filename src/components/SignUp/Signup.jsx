import React, { useEffect, useState } from "react";
import "../../css/Signup/Signup.css";
import CustomInput from "../CustomComponents/CustomInput/CustomInput";
import CustomButton from "../CustomComponents/CustomButton/CustomButton";
import CustomError from "../CustomComponents/CustomError/CustomError";
import InfoBox from "../InfoBox/InfoBox";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../Backbutton/BackButton";

const Signup = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {location.pathname === "/signup/status" && <SignupStatus />}
      {location.pathname !== "/signup/status" && (
        <div className="swift-login-main">
          <BackButton />
          <div className="swift-login">
            <div className="swift-signup-main-info">
              <InfoBox />
            </div>
            {location.pathname === "/signup" && <SignupMain />}
            {location.pathname === "/signup/pin" && <SignupPin />}
          </div>
        </div>
      )}
    </>
  );
};

const SignupMain = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const [otperror, setOtpError] = useState("error");
  const [emailerror, setEmailError] = useState("error");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const [otpVisible, setOtpVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const ValidateEmail = () => {
    const email = formValues["email"];

    const emailRegex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;

    if (email.trim() === "") {
      return "Email can not be empty";
    }
    if (!emailRegex.test(email)) {
      return "Email is not Valid";
    }
  };

  const handleGenerateOtp = () => {
    const error = ValidateEmail();
    if (!error) {
      setEmailError("error");
      setOtpVisible(true);
      setCountdown(30);
      setTextVisible(true);
      setIsButtonDisabled(true);
      setIsNextButtonDisabled(false);

      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setIsButtonDisabled(false);
      }, 30000);
    } else {
      setEmailError(error);
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      setTextVisible(false);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    if (isNextButtonDisabled) return;
    setOtpError("error");
    if (formValues["otp"] && formValues["otp"].length == 6) {
      if (formValues["otp"] == "123456") navigate("/signup/pin");
      else setOtpError("OTP is not correct");
    } else {
      setOtpError("OTP should be 6 length");
    }

    console.log(formValues);
  };

  return (
    <div className="swift-login-form">
      <div className="swift-login-form-div-1">
        <div className="swift-login-loginform-heading">
          <p>
            <i style={{ fontWeight: 300 }}>swift</i>
            folios
          </p>
        </div>

        <CustomInput
          labelText="Email"
          type="email"
          classnameInput="swift-login-form-email-input"
          name="email"
          placeholder="abc@gmail.com"
          onInputChange={handleInputChange}
        />
        <CustomError
          errorText={emailerror}
          style={{
            visibility: emailerror != "error" ? "visible" : "hidden",
          }}
        />

        <div className="swift-login-loginform-otp">
          <button
            className="swift-login-form-generate"
            onClick={handleGenerateOtp}
            disabled={isButtonDisabled}
            style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
          >
            Generate OTP
          </button>
          <p
            className="swift-login-form-wait"
            style={{ visibility: textVisible ? "visible" : "hidden" }}
          >
            Wait for {countdown}s to generate again
          </p>
        </div>

        <CustomInput
          labelText="One Time Password"
          type="number"
          classnameInput="swift-login-form-pin-input1"
          name="otp"
          placeholder="123456"
          maxLength="6"
          errormsg="OTP should be atleast 6 digits "
          onInputChange={handleInputChange}
          styleDiv={{ visibility: otpVisible ? "visible" : "hidden" }}
        />
        <CustomError
          errorText={otperror}
          style={{ visibility: otperror != "error" ? "visible" : "hidden" }}
        />
      </div>

      <CustomButton
        text="Next"
        classname="swift-login-form-btn"
        onClick={handleSubmit}
        disabled={isNextButtonDisabled}
        style={{ cursor: isNextButtonDisabled ? "not-allowed" : "default" }}
      />
    </div>
  );
};

const SignupPin = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const [pinerror, setPinError] = useState("error");
  const [confirmpinerror, setConfirmPinError] = useState("error");

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    setPinError("error");
    setConfirmPinError("error");
    if (formValues["pin"] && formValues["pin"].length == 4) {
      setPinError("error");
      if (formValues["confirmpin"] && formValues["confirmpin"].length == 4) {
        setConfirmPinError("error");
        if (formValues["confirmpin"] != formValues["pin"]) {
          setConfirmPinError("PIN does not match ");
        } else {
          navigate("/signup/status");
        }
      } else {
        setConfirmPinError("PIN should be atleast 4 digits");
      }
    } else {
      setPinError("PIN should be atleast 4 digits");
    }

    console.log(formValues);
  };

  return (
    <div className="swift-login-form">
      <div className="swift-login-form-div-1">
        <div className="swift-login-loginform-heading">
          <p>
            <i style={{ fontWeight: 300 }}>swift</i>
            folios
          </p>
        </div>

        <CustomInput
          labelText="PIN"
          type="number"
          name="pin"
          classnameInput="swift-login-form-pin-input1"
          placeholder="1235"
          maxLength="4"
          onInputChange={handleInputChange}
        />
        <CustomError
          errorText={pinerror}
          style={{
            visibility: pinerror != "error" ? "visible" : "hidden",
            // visibility: pinerror ? "visible" : "hidden",
          }}
        />
        <CustomInput
          labelText="Confirm PIN"
          type="number"
          name="confirmpin"
          classnameInput="swift-login-form-pin-input1"
          placeholder="1235"
          maxLength="4"
          onInputChange={handleInputChange}
          styleDiv={{
            marginTop: "15px",
          }}
        />
        <CustomError
          errorText={confirmpinerror}
          style={{
            visibility: confirmpinerror != "error" ? "visible" : "hidden",
          }}
        />
      </div>

      <CustomButton
        text="Sign-up"
        classname="swift-login-form-btn"
        onClick={handleSubmit}
      />
    </div>
  );
};

const SignupStatus = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/dashboard");
  };
  return (
    <div className="swift-signup-status-main">
      <div className="swift-signup-status-heading">
        <p>
          <i style={{ fontWeight: 300 }}>swift</i>
          folios
        </p>
      </div>
      <div className="swift-signup-status-info">
        <div className="swift-signup-status-info-1">
          <div>
            <div>Account status</div>
            <div style={{ fontWeight: 800 }}>Pending Approval</div>
            <div style={{ fontWeight: 800 }}>
              We are trying to get you onboarded as soon as possible.
            </div>
          </div>
          <div>
            Please be on the look our for any email from us which might indicate
            additional steps that you need to complete. Otherwise, we should get
            you over the line in 3 working days.
          </div>
          <div>
            For anything else, kindly reach out to us on{" "}
            <span style={{ fontWeight: 700 }}>accounts@swiftfolios.co.uk</span>
          </div>
        </div>
        <div className="swift-signup-status-info-2">
          <button className="swift-signup-status-button" onClick={clickHandler}>
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
