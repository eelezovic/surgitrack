import React, { useState, useEffect } from "react";

function instruments() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    //fetching data from the API
    fetch("/api/singleInstruments")
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
      })
      .catch((error) => {
        console.error("Error fetching instruments:", error);
      });
  }, []);

  return (
    <div>
      <h6> Instruments </h6>
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>{instrument.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default instruments;
