import { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import moment from "moment";

const dateTimeToday = moment().format("MMMM Do YYYY, dddd");

function App() {
  return (
    <div
      className="container my-7 mx-auto p-4 shadow"
      style={{ maxWidth: 600, backgroundImage: "linear-gradient(-40deg, #eeead5, #d8cf9f)", borderRadius: "30px 30px 30px 30px"}}
    >
      <h6 className="text-center mb-2">
        <span>{dateTimeToday}</span>
      </h6>
      <Container />
    </div>
  );
}

export default App;
