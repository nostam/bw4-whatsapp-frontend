import "./login-styles.scss";
import React, { useState } from "react";
import { DangerAlert, WhastAppBanner } from "../../components";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import fetchAuth from "../../client/fetchAuth";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const submitUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchAuth.post("/users/login", credentials);

      if (res.statusText === "OK") window.location.replace("/");
      setLoading(false);
      // if (res.statusText === "OK") {
      //   history.push("/");
      //   setLoading(false);
      // }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const url = process.env.REACT_APP_API_URL + "/users";
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
                <h4>To continue, log in to WhatsApp</h4>
              </div>
            </div>
            <form onSubmit={submitUser}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control my-4"
                  id="exampleInputEmail1"
                  placeholder="Enter your email here"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control my-4"
                  placeholder="Password"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-left">
                <a href="#ssss">Forgot your Password ?</a>
              </div>
              <div className="form-group d-flex my-3">
                {loading ? (
                  <Spinner animation="border" />
                ) : (
                  <button className="btn btn-login btn-lg">Log In</button>
                )}
              </div>
            </form>
            <div>
              <div className="text-center">
                <div className="my-2">
                  <strong>Not a member yet?</strong>
                </div>
                <div>
                  <Link to="/register" className="btn btn-lg">
                    SIGN UP FOR WHATSAPP
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
              <h4>Or Sign In With Following Services</h4>
            </div>
            <div className="thirdPartyContainer">
              <Link to={`${url}/googleLogin`}>
                <div className="description">
                  <FcGoogle size={48} className="snsIcon snsGoogle" />
                  <h5>Sign in with Google</h5>
                </div>
              </Link>
              <Link to={`${url}/facebookLogin`}>
                <div className="description">
                  <FaFacebook size={48} className="snsIcon snsFacebook" />
                  <h5>Sign in with Facebook</h5>
                </div>
              </Link>
              <Link to={`${url}/twitterLogin`}>
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
