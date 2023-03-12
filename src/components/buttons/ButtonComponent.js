import React from "react"; 
import "./ButtonComponent.module.css";

function ButtonComponent({name, image,klik}) {
  return (
    <div onClick={klik} className="button-container">
      <h2>{name}</h2>
      
    </div>
  );
}

export default ButtonComponent;