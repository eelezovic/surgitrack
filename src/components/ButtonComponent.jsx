import React from "react"; 
import "./ButtonComponent.module.css";


function ButtonComponent({name, imageURL}) {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
}

export default ButtonComponent;