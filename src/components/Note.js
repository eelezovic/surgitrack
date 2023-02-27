import React from "react";

function Note(props) {
  return (
    <div className="note">
      <h2 className="title">{props.title}</h2>
      <p className="content">{props.content}</p>
    </div>
  );
}

export default Note;