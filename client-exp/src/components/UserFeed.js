import React from "react";
import { Image, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";

export default function UserFeed() {
  const { userActivity, conversation } = useConversations();
  return (
    <div className="border">
      <div className="p-3">
        <h4>User Activity</h4>
        <div style={{ maxHeight: "45vh", overflowY: "scroll" }}>
          {userActivity.map((image) => {
            return (
              <div>
                <Image src={image} className="img-fluid w-50"></Image>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
