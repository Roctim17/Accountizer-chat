import React, { useContext, useState } from "react";
import SearchIcon from "../Image/search.png";
import "../Styles/Messages.css";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.init";
import MessageList from "./MessageList";
import { AuthContext } from "../Context/AuthContext";

const SearchBer = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      // console.log(res,combinedId,db,doc,getDoc);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };
  return (
    <div>
      <div className="search-box">
        <div className="search-icon">
          <img src={SearchIcon} alt="" />
        </div>
        <div className="search-text">
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
      </div>

      {err && <span>User not found!</span>}
      {user && (
        <div className="message-list" onClick={handleSelect}>
          <div className="messages-photo">
            <img src={user.photoURL} alt="" />
          </div>
          <div className="messages-content">
            <div className="message-sender">
              <div className="message-name">{user.displayName}</div>
              <div className="message-time">time</div>
            </div>
            <div className="message-text">
              <div className="message-text-send">message</div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBer;
