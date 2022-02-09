import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

const fetchData = () => {
  return axios.get("https://randomuser.me/api/?results=20").then((response) => {
    console.log(response)
    const {results} = response.data;
    return results
  }).catch((error) => console.error(error))
};

//https://randomuser.me/api/?results=20
function App() {

  const [users, setUsers] = useState([]);

  useEffect (() => {
   fetchData().then(setUsers);
  }, [])

 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sandbox!</h1>
        <p>
          Let's make some magic happen!
        </p>
        {users.map((user, userId) => <p key = {userId}>
          {user.name.first}
        </p> )}
      </header>
    </div>
  );
}

export default App;
