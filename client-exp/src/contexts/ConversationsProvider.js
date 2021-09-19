import React, { useContext, useState, useEffect, useCallback } from "react";
import speak from "../components/SpeechSynthesis";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversation, setConversation] = useLocalStorage("conversation", {
    messages: [],
  });
  const [layout, setLayout] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [text, setText] = useState("");
  const [robotText, setRobotText] = useState(
    "Hello! What would you like to search for?"
  );

  const socket = useSocket();

  function createConversation(recipients) {
    setConversation({ messages: [] }); // need to think about how to structure this
  }

  const addMessageToConversation = useCallback(
    ({ text, sender, timestamp }) => {
      if (sender === "userProfile") {
        setUserActivity((prevUserActivity) => {
          const newMessage = { text, type: "text" };
          const newConversation = [newMessage, ...prevUserActivity];
          return newConversation;
        });
      } else {
        setRobotText(text);
        speak(text, sender, id);
      }
    },
    [setUserActivity]
  );

  const addImagesToGrid = useCallback(
    ({ layout, sender, timestamp }) => {
      const currentLayout = JSON.parse(layout);
      console.log(currentLayout);
      currentLayout.forEach((item) => {
        item.static = true; // Make images static so User cannot use the grid
      });
      setLayout(currentLayout);
    },
    [setLayout]
  );

  const addUserActivity = useCallback(
    ({ image, sender, timestamp }) => {
      console.log("Recieved that user touched" + image);
      setUserActivity((prevUserActivity) => {
        const newImage = { image, type: "image" };
        const newUserActivity = [newImage, ...prevUserActivity];
        return newUserActivity;
      });
    },
    [setUserActivity]
  );

  const addText = useCallback(
    ({ text, sender, timestamp }) => {
      setText(text);
    },
    [setText]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    socket.on("receive-image", addImagesToGrid);
    socket.on("receive-touch", addUserActivity);
    socket.on("receive-text", addText);
    return () => {
      socket.off("receive-message");
      socket.off("receive-image");
      socket.off("receive-touch");
      socket.off("receive-text");
    };
  }, [
    socket,
    addMessageToConversation,
    addImagesToGrid,
    addUserActivity,
    addText,
  ]);

  function sendMessage(text, timestamp) {
    socket.emit("send-message", { text, timestamp });
    addMessageToConversation({ text, sender: id, timestamp });
  }

  function sendImage(layout, timestamp) {
    socket.emit("send-image", { layout, timestamp });
  }

  function sendTouch(image, timestamp) {
    socket.emit("send-touch", { image, timestamp });
  }

  function sendTextInfo(text, timestamp) {
    socket.emit("send-text", { text, timestamp });
  }

  const value = {
    conversation,
    createConversation,
    sendMessage,
    sendTextInfo,
    sendImage,
    sendTouch,
    userActivity,
    tiles: layout,
    text,
    robotText,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
