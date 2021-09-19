import React from "react";
import { Button } from "react-bootstrap";

export default function Logout({ onIdSubmit }) {
  const logout = () => {
    onIdSubmit(null);
  };
  return (
    <div className="d-flex justify-content-end p-3">
      <Button onClick={logout}>Log Out</Button>
    </div>
  );
}
