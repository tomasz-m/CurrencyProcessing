import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { latestValues } from "./domain/LatestValues";
import { changesInPeriod } from "./domain/ChangesInPeriod";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [changes, setChanges] = useState([]);
  const inputRef = useRef();


  useEffect(() => {
    latestValues(200).then(values => setCurrencies(values));
    changesInPeriod('2017-03-26','2017-07-13').then(values => setChanges(values))
  }, [inputRef]);

  const formatPercent = (value) => (value * 100).toFixed(4) + '%';

  return (
    <div className="app">
      <div className='card'>
        <h3 className="classHeader">200 SEK</h3>
        {Object.keys(currencies).map(i => <p key={i}>{i +': '+ currencies[i]}</p>)}
      </div>
      <div className='card'>
        <h3 className="classHeader">Changes between 2017-03-26 and 2017-07-13 </h3>
        {Object.keys(changes).map(i => <p key={i}>{i +': '+ formatPercent(changes[i])}</p>)}
      </div>
    </div>
  );
}

export default App;
