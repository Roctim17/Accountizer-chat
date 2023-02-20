import React, { useState } from "react";
import "../Styles/Login.css";
import Logo from "../Image/logo2.png";
import { Button, Checkbox, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.init";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Messages")
    } catch (err) {
      setErr(true);
    }
  };


  return (
    <div className="login-container">
      <div className="login">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="login-from">
          <h3>Expert Login</h3>
          <form onSubmit={handleSubmit}>
          <div>
            <p>Email address</p>
            <Input type="email" placeholder="Email address" />
          </div>
          <div>
            <p>Password</p>
            <Input type="password" placeholder="********" />
          </div>
          <div style={{display:"flex", justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <Checkbox onChange={onChange}>Remember Me</Checkbox>
            </div>
            <div>
              <p>Forgot Password?</p>
            </div>
          </div>
          <div>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Button htmlType="submit" type="primary" block>
                Login
              </Button>
            </Space>
          </div>
          <p>
          You do have an account? <Link to="/signup">Register</Link>
        </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
