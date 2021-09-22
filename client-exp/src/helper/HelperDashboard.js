import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import CreateSERP from "./CreateSERP";
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
          <CreateSERP />
        </div>
      </div>
    </div>
  );
}
