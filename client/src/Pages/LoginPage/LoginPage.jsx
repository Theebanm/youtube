import React, { useState } from "react";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { login } from "../../actions/auth";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, TextField } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Firebase/setup";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [otp, setOtp] = useState("");
  const sendOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "247427712416-s8kjtkout9vt032r4tng59bgdqfkco04.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();
  // const logTmp=()=>{
  //   dispatch(login({ email:"abzxy50312@gmail.com" }));
  // }
  const onSuccess = (response) => {
    const Email = response?.profileObj.email;
    console.log(Email);
    dispatch(login({ email: Email }));
  };

  const onFailure = (response) => {
    console.log("Failed", response);
  };

  return (
    <div className="container_login">
      <div className="container2_login">
        <div className="google_login">
          <>
            <GoogleLogin
              clientId={
                "247427712416-s8kjtkout9vt032r4tng59bgdqfkco04.apps.googleusercontent.com"
              }
              onSuccess={onSuccess}
              onFailure={onFailure}
              //   render={(renderProps) => (
              //     <p onClick={renderProps.onClick} className="Auth_Btn">
              //       {/* <p onClick={logTmp} className="Auth_Btn"> */}
              //       <BiUserCircle size={22} />
              //       <b>Sign in</b>
              //     </p>
              //   )}
            />
          </>
        </div>

        <h2>Other ways to Login....</h2>
        <div className="mobile_login">
          <div className="phone_content">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone("+" + phone)}
            />
            <Button
              onClick={sendOTP}
              sx={{ marginTop: "10px" }}
              variant="contained"
            >
              send Otp
            </Button>
            <div style={{ marginTop: "10px" }} id="recaptcha"></div>
            <br />
            <TextField
              onChange={(e) => setOtp(e.target.value)}
              sx={{
                marginTop: "10px",
                backgroundColor: "white",
                width: "300px",
              }}
              variant="outlined"
              size="small"
              label="Enter OTP"
            />
            <br />
            {otp ? (
              <>
                <Button
                  onClick={(verifyOtp, () => Navigate("/"))}
                  variant="contained"
                  color="success"
                >
                  Verify OTP
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
