import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import './App.css';
import { db } from './firebase-config';
const geofire = require('geofire-common');

function App() {
  const [charities, setCharities] = useState([]);
  const charitiesCollectionRef = collection(db, 'charities');

  useEffect(() => {
    const getCharities = async () => {
      const data = await getDocs(charitiesCollectionRef);
      setCharities(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getCharities();
  }, []);

  charities.map((charity) => {
    var a = charity.missions;
    Object.keys(a).map((key) => {
      const hash = geofire.geohashForLocation([a[key].coordinates.lat, a[key].coordinates.long]);
      const docRef = doc(db, "charities", charities[0]['id']);
      var usersUpdate = {};
      usersUpdate[`missions.Amsterdam.geohash`] = hash;
      db.collection("charities").doc(charities[0]['id']).update(usersUpdate);
      return key;
    })
    return charity;
  })

  return (
    <div className="App">{charities.map((charity) => {
      return (
        <div>
          <h1>Name: {charity.name}</h1>
          <h2>Missions:</h2>
          {Object.keys(charity.missions).map((key) => {
            return (
              <div>
                <h3>{key}</h3>
                <p>Description: {charity.missions[key].description}</p>
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
