import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./items";
import contacts from "./home.contents";





function App() {
  return ( 
  <div>
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
