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

//helper function for flattening object data. recursive for nested objects
function flattenObject(object, parent, res = {}) {
  for (let key in object) {
    let propName = parent ? parent + "-" + key : key;
    if (typeof object[key] === typeof {} && !Array.isArray(object[key])) {
      flattenObject(object[key], propName, res);
    } else {
      res[propName] = object[key];
    };
  };
  return res
}

//https://randomuser.me/api/?results=20
function App() {

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect (() => {
   fetchData().then((people) => {
     setUsers(people);
     //the map below could also employ destructuring. people.map(({location}) => location)
     setLocations(people.map(({location}) => flattenObject(location)))
   });
  }, []);

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
