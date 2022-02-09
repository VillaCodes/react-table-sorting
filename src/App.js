import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

const fetchData = () => {
  return axios.get("https://randomuser.me/api/?results=20").then((data) => console.log(data)).catch((error) => console.error(error))
};

//https://randomuser.me/api/?results=20
function App() {

  useEffect (() => {
   fetchData();
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <h1>Sandbox!</h1>
        <p>
          Let's make some magic happen!
        </p>
      </header>
    </div>
  );
}

export default App;
