import React from "react";

function Items(props) {
  return (
    <div className="item">
      <h2 className="content">{props.content}</h2>
    </div>
  );
}

export default Items;