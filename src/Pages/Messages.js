import { Col, Row, Steps, Progress, Tooltip, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
// import "../Styles/MyRequest.css";
import MessageList from "../Component/MessageList";
import SearchBer from "../Component/Search";
import MessageBox from "../Component/MessageBox";
import { ChatContext } from "../Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.init";
import TextInput from "../Component/TextInput";

const Messages = () => {
 
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log("message");
  return (
    <div>
      <div>
        <div className="body">
          <div className="message-part">
            <div className="message-chat">
              <div>
                <SearchBer />
                <div className="message-list-container">
                  <MessageList></MessageList>
                </div>
              </div>
            </div>
            <div className="message-details">
              <div className="message-area">
                {messages.map((m) => (
                  <MessageBox message={m} key={m.id}></MessageBox>
                ))}
              </div>
              <TextInput></TextInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
