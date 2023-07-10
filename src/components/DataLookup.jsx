import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function DataLookup() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];

      const querySnapshot = await getDocs(collection(firestore, "employees"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {/* Displaying only name here, similarly add more fields */}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default DataLookup;
