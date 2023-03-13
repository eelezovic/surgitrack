import React from "react"; 
import "./ButtonComponent.module.css";


function ButtonComponent({onClick,name, image}) {
  return (
    <div className="button-container">
      <button onClick={onClick} className="button">
        {name}
      </button>

      <h2>{name}</h2>
    </div>
  );
}

export default ButtonComponent;