import React from "react";
import SearchSystem from "./SearchSystem";
import UserFeed from "./UserFeed";
import CreateSERP from "./CreateSERP";
import LogsControl from "./LogsControl";

export default function HelperDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col">
          <LogsControl />
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
