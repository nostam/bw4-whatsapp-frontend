import "./register-styles.scss";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import fetchBe from "../../client/fetchBe";
import { DangerAlert, WhastAppBanner } from "../../components";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function Register() {
  const history = useHistory();
  const prevCredentials = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credentials, setCredentials] = useState({
    nickname: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (credentials.email !== prevCredentials.email) {
      setError(null);
    }
  }, [credentials]);

  useEffect(() => {
    confirmPassword.length !== 0 && confirmPassword !== credentials.password
      ? confirmPassword.length < 6
        ? setError("Password is too short")
        : setError("Password mismatch!")
      : setError(null);
  }, [confirmPassword, credentials.password]);

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const submitUser = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetchBe.post("/users/register", credentials);
      if (res.httpStatusCode === 201) {
        setLoading(false);
        setCredentials({
          nickname: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
        //window.location.replace("/");
        history.push("/login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <WhastAppBanner />
      <div id="login" className="">
        <div className="landing-container">
          <div id="landing-a">
            {error && <DangerAlert messsage={error} />}
            <div className="row d-flex" style={{ textAlign: "center" }}>
              <div
                className="col-12"
                style={{ color: "#111", textAlign: "left" }}
              >
                <h4>To continue, Sign Up to WhatsApp</h4>
              </div>
            </div>

            <form onSubmit={submitUser}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="First Name"
                  required
                  name="firstName"
                  value={credentials.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Last Name"
                  required
                  name="lastName"
                  value={credentials.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Display Name"
                  required
                  name="nickname"
                  value={credentials.nickname}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                  placeholder="Email address"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  id="exampleInputPassword2"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
              </div>
              <div
                className="form-group form-check d-flex pl-0"
                style={{ justifyContent: "space-between" }}
              >
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  <button
                    className="btn btn-success btn-lg "
                    style={{ width: "100%" }}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>

            <div>
              <div className="text-center">
                <div className="my-2">
                  <strong>Already have an account?</strong>
                </div>
                <div>
                  <Link to="/login" className="btn btn-lg">
                    SIGN IN
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <span
              style={{
                textAlign: "center",
                color: "rgba(202, 204, 203, 0.253)",
              }}
            >
              <a href="#ddd">Terms & Condition</a> and{" "}
              <a href="#dddd">Privacy Policy</a>
            </span>
          </div>

          <div id="landing-b">
            {/* <hr className="seperator" /> */}
            <div className="description">
              <h4>Or Sign Up With Following Services</h4>
            </div>
            <div className="thirdPartyContainer">
              <Link to={process.env.REACT_APP_API_URL + "/users/googleLogin"}>
                <div className="description">
                  <FcGoogle size={48} className="snsIcon snsGoogle" />
                  <h5>Sign in with Google</h5>
                </div>
              </Link>
              <Link to={process.env.REACT_APP_API_URL + "/users/facebookLogin"}>
                <div className="description">
                  <FaFacebook size={48} className="snsIcon snsFacebook" />
                  <h5>Sign in with Facebook</h5>
                </div>
              </Link>
              <Link to={process.env.REACT_APP_API_URL + "/users/twitterLogin"}>
                <div className="description">
                  <FaTwitter size={48} className="snsIcon  snsTwitter" />
                  <h5>Sign in with Twitter</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
