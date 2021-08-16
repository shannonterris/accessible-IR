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

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    socket.on("receive-image", addImagesToGrid);
    socket.on("receive-touch", addUserActivity);
    return () => {
      socket.off("receive-message");
      socket.off("receive-image");
      socket.off("receive-touch");
    };
  }, [socket, addMessageToConversation, addImagesToGrid, addUserActivity]);

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

  const value = {
    conversation,
    createConversation,
    sendMessage,
    sendImage,
    sendTouch,
    userActivity,
    tiles: layout,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
