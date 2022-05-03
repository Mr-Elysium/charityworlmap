import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import './App.css';
import { db } from './firebase-config';
const geofire = require('geofire-common');

function App() {
  const [charities, setCharities] = useState([]);
  const [missions, setMissions] = useState([]);
  const charitiesCollectionRef = collection(db, 'charities');

  useEffect(() => {
    const getCharities = async () => {
      const data = await getDocs(charitiesCollectionRef);
      setCharities(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    const getMissions = async (ref) => {
      const data = await getDocs(ref);
      setMissions(data.docs.map((doc) => missions.push({...doc.data(), id: doc.id})));
    };
    getCharities();
    charities.map((charity) => {
      const docRef = collection(db, "charities", charity.id, "Missions");
      getMissions(docRef);
      return charity;
    })
    console.log(missions, "1");
  }, []);



  return (
    <div className="App">{charities.map((charity) => {
      console.log(charity.id);
      return (
        <div key={charity.id}>
          <h1>Name: {charity.name}</h1>
          <h3>Missions:</h3>
          {missions.map((mission) => {
            return (
              <div key={mission.id}>
                <h5>{mission.name}</h5>
                <p>{mission.location}</p>
                <p>{missions.description}</p>  
              </div>
            );
          })}
        </div>
      );
    })}
    </div>
  );
}

export default App;
