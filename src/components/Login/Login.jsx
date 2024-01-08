import React, { useEffect, useState } from "react";
import "../../css/Login/Login.css";
import CustomInput from "../CustomComponents/CustomInput/CustomInput";
import CustomButton from "../CustomComponents/CustomButton/CustomButton";
import CustomError from "../CustomComponents/CustomError/CustomError";
import InfoBox from "../InfoBox/InfoBox";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BackButton from "../Backbutton/BackButton";

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <div className="swift-login-main">
      <BackButton />
      <div className="swift-login">
        <div className="swift-signup-main-info">
          <InfoBox />
        </div>
        {location.pathname === "/login" && <LoginMain />}
        {location.pathname === "/login/pin" && <LoginPin />}
        {location.pathname === "/login/reset" && <LoginReset />}
        {location.pathname === "/login/resetsuccessful" && (
          <LoginResetSuccessful />
        )}
      </div>
    </div>
  );
};

const LoginMain = () => {
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
    const validEmails = [
      "user1@gmail.com",
      "user2@gmail.com",
      "user3@gmail.com",
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Enter Valid Email";
    }

    if (!validEmails.includes(email)) {
      return "Email does not exist";
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
    setOtpError("error");

    if (isNextButtonDisabled) return;
    if (formValues["otp"] && formValues["otp"].length == 6) {
      if (formValues["otp"] == "123456") navigate("/login/pin");
      else setOtpError("OTP is not correct");
    } else {
      setOtpError("OTP should be 6 length");
    }

    console.log(formValues);
  };

  return (
    <>
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
            styleDiv={{
              visibility: otpVisible ? "visible" : "hidden",
              paddingTop: "16px",
            }}
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
    </>
  );
};

const LoginPin = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});
  const [pinerror, setPinError] = useState("error");

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (formValues["pin"] && formValues["pin"] == "1234") {
      setPinError("error");
      navigate("/");
    } else {
      setPinError("Pin is not Correct");
    }
    console.log(formValues);
  };

  return (
    <>
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
            classnameInput="swift-login-form-pin-input1"
            name="pin"
            maxLength={4}
            placeholder="1234"
            onInputChange={handleInputChange}
          />

          <div className="swift-login-form-error">
            <CustomError
              errorText={pinerror}
              style={{
                visibility: pinerror != "error" ? "visible" : "hidden",
              }}
            />
            <Link to="/login/reset">
              <button className="swift-login-form-reset-pin">Reset PIN</button>
            </Link>
          </div>
        </div>

        <CustomButton
          text="Login"
          classname="swift-login-form-btn"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

const LoginReset = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const [otperror, setOtpError] = useState("error");
  const [pinerror, setPinError] = useState("error");
  const [confirmpinerror, setConfirmPinError] = useState("error");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);

  const [otpVisible, setOtpVisible] = useState(false);
  const [pinVisible, setPinVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleGenerateOtp = () => {
    setOtpVisible(true);
    setCountdown(30);
    setTextVisible(true);
    setIsButtonDisabled(true);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      setIsButtonDisabled(false);
    }, 30000);
  };

  const handleValidate = () => {
    if (formValues["otp"] && formValues["otp"].length == 6) {
      if (formValues["otp"] === "123456") {
        setOtpError("error");
        setPinVisible(true);
        setIsButtonDisabled(true);
        setTextVisible(false);
        setIsResetButtonDisabled(false);
      } else {
        setOtpError("OTP is not correct");
      }
    } else {
      setOtpError("OTP should be 6 length");
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      setTextVisible(false);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPinError("error");
    setConfirmPinError("error");
    if (isResetButtonDisabled) return;
    if (formValues["pin"] && formValues["pin"].length == 4) {
      setPinError();
      if (formValues["confirmpin"] && formValues["confirmpin"].length == 4) {
        setConfirmPinError();
        if (formValues["confirmpin"] != formValues["pin"]) {
          setConfirmPinError("PIN does not match with above input");
        } else {
          navigate("/login/resetsuccessful");
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
    <>
      <div className="swift-login-form">
        <div className="swift-login-form-div-1">
          <div className="swift-login-form-heading">
            <p>
              <i style={{ fontWeight: 300 }}>swift</i>
              folios
            </p>
          </div>
          <div className="swift-login-form-reset">
            <p>Reset PIN</p>
          </div>
          <div className="swift-login-form-otp">
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
            classnameInput="swift-login-form-otp-input"
            name="otp"
            placeholder="123456"
            maxLength="6"
            onInputChange={handleInputChange}
            styleDiv={{ visibility: otpVisible ? "visible" : "hidden" }}
          />
          <CustomError
            errorText={otperror}
            style={{
              visibility: otperror != "error" ? "visible" : "hidden",
            }}
          />
          <CustomButton
            text="Validate"
            classname={"swift-login-form-validate-btn"}
            style={{
              visibility: otpVisible ? "visible" : "hidden",
            }}
            onClick={handleValidate}
          />
          <CustomInput
            labelText="PIN"
            type="number"
            name="pin"
            classnameInput="swift-login-form-pin-input"
            placeholder="1235"
            maxLength="4"
            onInputChange={handleInputChange}
            styleDiv={{ visibility: pinVisible ? "visible" : "hidden" }}
          />
          <CustomError
            errorText={pinerror}
            style={{
              visibility: pinerror != "error" ? "visible" : "hidden",
            }}
          />
          <CustomInput
            labelText="Confirm PIN"
            type="number"
            name="confirmpin"
            classnameInput="swift-login-form-confirmpin-input"
            placeholder="1235"
            maxLength="4"
            onInputChange={handleInputChange}
            styleDiv={{
              marginTop: "9px",
              visibility: pinVisible ? "visible" : "hidden",
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
          text="Reset"
          classname="swift-login-form-btn"
          onClick={handleSubmit}
          disabled={isResetButtonDisabled}
          style={{
            cursor: isResetButtonDisabled ? "not-allowed" : "default",
          }}
        />
      </div>
    </>
  );
};

const LoginResetSuccessful = () => {
  return (
    <>
      <div className="swift-login-form">
        <div className="swift-login-form-div-1">
          <div className="swift-login-loginform-heading">
            <p>
              <i style={{ fontWeight: 300 }}>swift</i>
              folios
            </p>
          </div>
        </div>
        <div className="swift-login-form-svg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M33.3961 18.6868C34.0063 19.297 34.0063 20.2863 33.3961 20.8965L22.9795 31.3131C22.3693 31.9233 21.3801 31.9233 20.7698 31.3131L16.6031 27.1465C15.993 26.5362 15.993 25.5471 16.6031 24.9369C17.2133 24.3267 18.2027 24.3267 18.8129 24.9369L21.8747 27.9985L31.1865 18.6868C31.7968 18.0766 32.7859 18.0766 33.3961 18.6868Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.8807 2.60417H25.1199C29.9291 2.60415 33.6978 2.60413 36.6385 2.99948C39.6482 3.40415 42.0235 4.24861 43.8876 6.1128C46.362 8.58723 47.0495 11.975 47.2795 16.5889C47.3224 17.4508 46.6585 18.1843 45.7966 18.2272C44.9347 18.2702 44.2012 17.6063 44.1582 16.7445C43.9326 12.2189 43.2607 9.90532 41.6778 8.32251C40.491 7.13571 38.8853 6.45469 36.222 6.09661C33.5137 5.73248 29.9549 5.72917 25.0003 5.72917C20.0457 5.72917 16.4869 5.73248 13.7786 6.09661C11.1153 6.45469 9.5096 7.13571 8.32283 8.32251C7.13603 9.50928 6.45501 11.1149 6.09693 13.7783C5.73281 16.4866 5.72949 20.0454 5.72949 25C5.72949 29.9546 5.73281 33.5133 6.09693 36.2217C6.45501 38.885 7.13603 40.4906 8.32283 41.6775C9.5096 42.8644 11.1153 43.5454 13.7786 43.9033C16.4869 44.2675 20.0457 44.2708 25.0003 44.2708C29.9549 44.2708 33.5137 44.2675 36.222 43.9033C38.8853 43.5454 40.491 42.8644 41.6778 41.6775C42.8647 40.4906 43.5457 38.885 43.9037 36.2217C44.2678 33.5133 44.2712 29.9546 44.2712 25C44.2712 24.1371 44.9707 23.4375 45.8337 23.4375C46.6966 23.4375 47.3962 24.1371 47.3962 25V25.1196C47.3962 29.9288 47.3962 33.6975 47.001 36.6381C46.5962 39.6479 45.7518 42.0231 43.8876 43.8873C42.0235 45.7515 39.6482 46.5958 36.6385 47.0006C33.6978 47.3958 29.9291 47.3958 25.1199 47.3958H24.8807C20.0716 47.3958 16.3028 47.3958 13.3622 47.0006C10.3523 46.5958 7.97731 45.7515 6.11312 43.8873C4.24893 42.0231 3.40447 39.6479 2.9998 36.6381C2.60445 33.6975 2.60447 29.9288 2.60449 25.1196V24.8804C2.60447 20.0713 2.60445 16.3025 2.9998 13.3619C3.40447 10.352 4.24893 7.97698 6.11312 6.1128C7.97731 4.24861 10.3523 3.40415 13.3622 2.99948C16.3028 2.60413 20.0716 2.60415 24.8807 2.60417Z"
                fill="black"
              />
            </svg>
          </div>
          <p>PIN reset has been successful</p>
        </div>

        <Link to="/login">
          <CustomButton text="Login Again" classname="swift-login-form-btn" />
        </Link>
      </div>
    </>
  );
};

export default Login;
