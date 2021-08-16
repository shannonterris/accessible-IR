import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import Message from "./Message";

export default function HelperDashboard({ id }) {
  return (
    <div className="row">
      <div className="col">
        <SearchSystem />
        <UserFeed />
      </div>
      <div style={{ width: "600px" }}>
        <Message id={id} />
      </div>
    </div>
  );
}
