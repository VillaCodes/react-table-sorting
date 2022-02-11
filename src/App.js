import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";


//the function below would preferably be inside of a util/api folder+file
const fetchData = () => {
  return axios.get("https://randomuser.me/api/?results=20").then((response) => {
    console.log(response.data)
    const {results} = response.data;
    return results
  }).catch((error) => console.error(error))
};

//https://randomuser.me/api/?results=20
function App() {

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect (() => {
   fetchData().then((people) => {
     setUsers(people);
     //the map below could also employ destructuring. people.map(({location}) => location)
     setLocations(people.map((person) => person.location))
   });
  }, []);

  console.log(locations)

  // const table = users.map((user, userId) => {
  //   return (
  //   <tb>
  //   <tr>
  //     <th>{user.location}</th>
  //   </tr>
  //   </tb>
  // )})
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
