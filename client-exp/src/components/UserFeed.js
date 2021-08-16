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
          {userActivity.map((activity) => {
            if (activity.type === "image") {
              return (
                <div>
                  <Image
                    src={activity.image}
                    className="img-fluid w-50"
                  ></Image>
                </div>
              );
            } else if (activity.type === "text") {
              return (
                <div className="my-1 d-flex flex-column align-items-start">
                  <div className="rounded px-2 py-1 bg-primary text-white">
                    {activity.text}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
