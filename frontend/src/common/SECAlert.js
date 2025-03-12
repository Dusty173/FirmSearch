import React from "react";
import "./Alert.css";
function SECAlert({ type = "danger", messages }) {
  let msg = messages.toString();

  return (
    <div className={`alert alert-${type}`} role="alert">
      <p className="user_alert">{msg}</p>
    </div>
  );
}

export default SECAlert;
