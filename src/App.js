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
/**
 * @param ob Object                 The object to flatten
 * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
 **/
 function flattenObject(ob, prefix = false, result = null) {
  result = result || {};

  // Preserve empty objects and arrays, they are lost otherwise
  if (prefix && typeof ob === 'object' && ob !== null && Object.keys(ob).length === 0) {
    result[prefix] = Array.isArray(ob) ? [] : {};
    return result;
  }

  prefix = prefix ? prefix + '.' : '';

  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === 'object' && ob[i] !== null) {
        // Recursion on deeper objects
        flattenObject(ob[i], prefix + i, result);
      } else {
        result[prefix + i] = ob[i];
      }
    }
  }
  return result;
}

//https://randomuser.me/api/?results=20

function App() {

  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  console.log(locations)
  //flattenedLocations features each flattenedLocation object within an array

  const sortColumn = (header) => {
    console.log(header);
  };

  useEffect (() => {
   fetchData().then((people) => {
     setUsers(people);
     //the map below could also employ destructuring. people.map(({location}) => location)
     setLocations(people.map(({location}) => flattenObject(location)))
   });
  }, []);

  /*{ {users.map((user, userId) => <p key = {userId}>
  {user.name.first})} }*/

  const extractHeaders = (flattenedLocationsArray) => {
    const headers = []; 

    if (flattenedLocationsArray[0]) {
    const firstLocation = flattenedLocationsArray[0];
    Object.keys(firstLocation).forEach((key) => headers.push(key))
    }
    return headers;
  }

  const headersArray = extractHeaders(locations)

  console.log(headersArray)

  return (
    <div className="App">
    <h1>Hello, Code Sandbox!</h1>
    <h2>Code it on up, pal</h2>
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <table style={{border: "1px solid black", textAlign: "center"}}>
        <thead>
            <tr>
              {headersArray.map((header, idx) => <th key={idx} onClick = {(header) => sortColumn(header)}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
              {locations.map((location, idx) => {
                return <tr key={idx}>{Object.values(location).map((locationValue, valueIdx) => (
                  <td key={valueIdx}>{locationValue}</td>
                ))}
                        </tr>
              })}
          </tbody>
        </table>
    </div>
    </div>
  );
}


export default App;
