import React from "react";

function Alert(props) {
  const capitilize = (word) => {
    if (word === "success") {
      word = "Success";
    } else if (word === "danger") {
      word = "Error";
    } else if (word === "warning") {
      word = "Warning";
    } else if (word === "info") {
      word = "Info";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitilize(props.alert.type)}</strong> : {props.alert.msg}
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
      </div>
    )
  );
}

export default Alert;
