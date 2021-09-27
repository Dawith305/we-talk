import styled from "styled-components";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRef,useEffect } from "react";

function Chat() {

    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(roomId && db.collection('rooms').doc(roomId));
    const [roomMessages, loading] = useDocument(roomId && 
                        db.collection('rooms')
                          .doc(roomId)
                          .collection('messages')
                          .orderBy('timestamp','asc'));


    const chatRef = useRef(null);

    //hook that runs when the component is mounted
    useEffect(() => {
        
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        // will run these piece of code
        //when the roomId or the loading variable
        //states changes
    }, [roomId, loading])

  return (
    <ChatContainer>

        {roomDetails && roomMessages && (

        // {/* this is added to add more that one root elemet in react
        // we can add another child other than ChatHeader. Here we added
        // the CharMessage in bottom */}
            <>
            <ChatHeader>
              {/* ****** Left Section ***** */}
              <HeaderLeft>
                <h4>
                  <strong>#{roomDetails?.data().name}</strong>
                </h4>
                <StarBorderOutlined />
              </HeaderLeft>
      
              {/* ***** Right Section ****** */}
              <HeaderRight>
                <p>
                  <InfoOutlined /> Details
                </p>
              </HeaderRight>
            </ChatHeader>
      
            <ChatMessages>
      
                {roomMessages?.docs.map((doc) => {
                    const {message, timestamp, user, userImage} = doc.data();
      
                    return (
                        <Message
                        key={doc.id}
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                        />
                    );
                })}
            </ChatMessages >
      
          <ChatBottom ref={chatRef}/>
            <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
            />
            </>
        )}
    
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const ChatMessages = styled.div`
`;

const ChatHeader = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
      display: flex;
      align-items: center;
      font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
    }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
