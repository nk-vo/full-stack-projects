// src/Form.js

import React, { useState } from "react";
import { firestore, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


function Form() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const downloadURL = await storeFile();
    const docRef = await addDoc(collection(firestore, "employees"), {
      name,
      id,
      email,
      department,
      employmentStatus,
      file: downloadURL,
    });
  };

  const storeFile = async () => {
    const storageRef = ref(storage, `files/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="ID"
      />
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select
        value={department}
        onChange={e => setDepartment(e.target.value)}
      >
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="engineering">Engineering</option>
        {/* Add more options as needed */}
      </select>
      <select
        value={employmentStatus}
        onChange={e => setEmploymentStatus(e.target.value)}
      >
        <option value="full-time">Full Time</option>
        <option value="part-time">Part Time</option>
        <option value="contract">Contract</option>
        {/* Add more options as needed */}
      </select>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
