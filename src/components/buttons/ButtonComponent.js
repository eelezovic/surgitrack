import React from "react"; 
import "./ButtonComponent.module.css";

function ButtonComponent({name, image}) {
  return (
    <div className="button-container">
      <h2>{name}</h2>
    </div>
    
  )

}

export default ButtonComponent;