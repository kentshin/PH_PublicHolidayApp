import { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import moment from "moment";

const dateTimeToday = moment().format("MMMM Do YYYY, dddd");

function App() {
  return (
    <div
      className="container my-7 mx-auto  border border-2 p-4 shadow"
      style={{ maxWidth: 600, backgroundColor: "#F5F3E7" }}
    >
      <h6 className="text-center mb-2">
        <span className="text-success">{dateTimeToday}</span>
      </h6>
      <Container />
    </div>
  );
}

export default App;
