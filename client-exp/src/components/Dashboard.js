import React from "react";
import * as Constants from "../constants";
import HelperDashboard from "./HelperDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard({ id }) {
  return (
    <div
      className={`container ${
        id === Constants.userId ? "user-dashboard-container" : ""
      }`}
    >
      <p className="h1">{id === Constants.userId ? "User" : "Helper"}</p>
      {id === Constants.helperId ? (
        <HelperDashboard id={id} />
      ) : (
        <UserDashboard id={id} />
      )}
    </div>
  );
}
