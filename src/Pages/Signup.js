import React, { useState } from "react";
import "../Styles/Login.css";
import Logo from "../Image/logo2.png";
import { Button, Checkbox, Form, Input, Space, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase.init";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { PlusOutlined } from '@ant-design/icons';


const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const Signup = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
   
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res)

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/MyRequest");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
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
            <p>Name</p>
            <Input required type="text" placeholder="Name" />
          </div>
          <div>
            <p>Email address</p>
            <Input required type="email" placeholder="Email address" />
          </div>
          <div>
            <p>Password</p>
            <Input required type="password"  placeholder="********" />
          </div>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <PlusOutlined />
            <span>Upload Image</span>
          </label>
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
              <Button htmlType="submit" type="primary" block
              disabled={loading}
              >
                Register 
              </Button>
            </Space>
          </div>
          <p>
          You do have an account? <Link to="/">Login</Link>
        </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
