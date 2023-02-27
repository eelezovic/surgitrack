import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import contacts from "./contacts";

function App() {
  return ( 
  <div>
    <Header />
    <Note 
      title={contacts[0].title}
      content={contacts[0].content}
    />
      <Note 
      title={contacts[1].title}
      content={contacts[1].content}
    />
    <Footer />
  </div>
  );
}

export default App;
