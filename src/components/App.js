import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./items";
import contacts from "./home.contents";
import Login from "./Login";


const  isLoggedIn = false ;


function App() {
  return ( 
  <div>
    <div className="container">{
      isLoggedIn === true ? <h1>Hello</h1> : <Login />
    }</div>
    <Header />
    <Note 
      content={contacts[0].content}
    />
      <Note 
      content={contacts[1].content}
    />
    <Note 
      content={contacts[2].content}
    />
    <Footer />
  </div>
  );
}

export default App;
