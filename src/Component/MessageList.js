import React, { useContext, useEffect, useState } from "react";
import "../Styles/Messages.css";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase.init";
import { doc, onSnapshot } from "firebase/firestore";

const MessageList = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(chats);
  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="message-list"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="messages-photo">
              <img src={chat[1].userInfo.photoURL} alt="" />
            </div>

            <div className="messages-content">
              <div className="message-sender">
                <div className="message-name">
                  {chat[1].userInfo.displayName}
                </div>
                <div className="message-time">time</div>
              </div>
              <div className="message-text">
                <div className="message-text-send">
                  {chat[1].lastMessage?.text}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessageList;
