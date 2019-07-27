import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { latestValues } from "./domain/LatestValues";
import { changesInPeriod } from "./domain/ChangesInPeriod";

function Card(props) {
  return (
    <div className="card">
      <h4 className="cardHeader">{props.header}</h4>
      {props.isLoading && <span className="cardProgress">loading...</span>}
      <div className="cardContent">
        {props.children}
        </div>
    </div>
  );
}

function App() {
  const [currencies, setCurrencies] = useState(JSON.parse(localStorage.getItem('currencies')));
  const [changes, setChanges] = useState(JSON.parse(localStorage.getItem('changes')));
  const inputRef = useRef();

  useEffect(() => {
    latestValues(200).then(values => setCurrencies(values));
    changesInPeriod("2017-03-26", "2017-07-13").then(values =>
      setChanges(values)
    );
  }, [inputRef]);

  useEffect(() => {
    localStorage.setItem('currencies', JSON.stringify(currencies));
    localStorage.setItem('changes', JSON.stringify(changes));
  })

  const formatPercent = value => (value * 100).toFixed(4) + "%";

  return (
    <div className="app">
      <Card header="200 SEK" isLoading={false}>
        {Object.keys(currencies).map(i => (
          <p key={i}>{i + ": " + currencies[i]}</p>
        ))}
      </Card>
      <Card header="Changes between 26.03 and 13.07 2017" isLoading={false}>
        {Object.keys(changes).map(i => (
          <p key={i}>{i + ": " + formatPercent(changes[i])}</p>
        ))}
      </Card>
    </div>
  );
}

export default App;
