import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import './App.css';
import { db } from './firebase-config';
const geofire = require('geofire-common');

function App() {
  const [charities, setCharities] = useState([]);
  const [missions, setMissions] = useState({});
  const charitiesCollectionRef = collection(db, 'charities');

  useEffect(() => {
    getCharities();
  }, []);

  useEffect(() => {
    console.log(missions)
    charities.map((charity) => {
      const docRef = collection(db, "charities", charity.id, "Missions");
      getMissions(docRef, charity.id);
      return charity;
    })
  }, [charities]);

  const getCharities = async () => {
    console.log(0);
    const data = await getDocs(charitiesCollectionRef);
    setMissions(data.docs.map((doc) => (missions[doc.id] = [])));
    setCharities(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };
  const getMissions = async (ref, id) => {
    const data = await getDocs(ref);
    // console.log(data.docs);
    // data.docs.map((doc) => {
    //   setMissions(data.docs.map((doc) => missions[id].push({...doc.data(), id: doc.id})));
    // })
    // console.log(data.docs[0].data());
    // setMissions(data.docs.map((doc) => missions[id].push({...doc.data(), id: doc.id})));
    console.log(missions);
  };

  // console.log(charities);

  return (
    <div className="App">{charities.map((charity) => {
      return (
        <div key={charity.id}>
          <h1>Name: {charity.name}</h1>
          <h3>Missions:</h3>
          {/* {missions.map((mission) => {
            return (
              <div key={mission.id}>
                <h5>{mission.name}</h5>
                <p>{mission.location}</p>
                <p>{missions.description}</p>  
              </div>
            );
          })} */}
        </div>
      );
    })}
    </div>
  );
}

export default App;
