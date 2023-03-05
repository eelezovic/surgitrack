import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./items";
import contacts from "./home.contents";
import Login from "./Login";


const isLoggedIn = false;

function renderConditionally() {
  if (isLoggedIn === true) {
    return <h1>Hello</h1>;
} else{
   return <Login />
  }
}

function App() {
  return ( 
  <div>
   <div className="container">{renderConditionally()}</div>
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
