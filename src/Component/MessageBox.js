import React, { useContext, useEffect, useRef } from "react";
import { Col, Row, Steps, Progress, Tooltip, Space, message } from "antd";
import photo from "../Image/Photo.png";
import photo1 from "../Image/bg-main.png";
import Attachment from "../Image/attachment.png";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import '../Styles/MessageBox.css'

const MessageBox = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* <div className="date">
        <div className="date-box">
          <p>4 March</p>
        </div>
      </div> */}
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
            // photo
          }
          alt=""
        />
        
      </div>
      <div className="messageContent">
        <div><p>{message.text}</p></div>
        <div><span>time</span></div>
         {message.img && 
        <img src={message.img} alt="" />}
      </div>
      
    </div>
  );
};

export default MessageBox;
