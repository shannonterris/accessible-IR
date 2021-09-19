import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import MessageControl from "./MessageControl";
import LogsControl from "./LogsControl";

export default function HelperDashboard() {
  return (
    <div>
      <LogsControl />
      <div className="row">
        <div className="col">
          <SearchSystem />
          <UserFeed />
        </div>
        <div style={{ width: "600px" }}>
          <MessageControl />
        </div>
      </div>
    </div>
  );
}
