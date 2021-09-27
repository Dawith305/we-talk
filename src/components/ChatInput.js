import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useRef, useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";



function ChatInput({ channelName, channelId, chatRef }) {
  //similar to id's or ref is VUE
  //useRef Hook we use to bind it to an element
  // access it's values later on
  //   const inputRef = useRef(null);

  const [message, setMessage] = useState("");

  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    //if no channel then don't send message
    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user : user.displayName,
      userImage: user.photoURL
    });

    chatRef?.current?.scrollIntoView({
        behavior: "smooth",
    });

    setMessage('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
