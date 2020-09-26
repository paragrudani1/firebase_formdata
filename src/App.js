/** @format */

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";


import firebase from "./firebase";
import axios from "axios";

function App() {
  const [values, setValues] = useState({
    name: "",
    number: "",
    photo: null,
    quality: "",
  });

  const handleChange = () => {

    // Here We are uploading photo to firebase storage
    let bucketName = "orbital-photo";

    // This is the detail of photo which is being stored
    let file = values.photo[0];

    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);

    let uploadTask = storageRef
      .put(file)
      .then((path) => {
        storageRef
          .getDownloadURL()
          .then((url) => {

            // We get the URL of image and sending all data entered on form to realtime database
            axios
              .post("https://form-data-c5373.firebaseio.com/formdata.json", {
                name: values.name,
                number: values.number,
                photo: url,
                quality: values.quality,
              })
              .then((data) => alert("You have Successfully Stored data!"))
              .catch((err) => alert("Something went wrong!"));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChange();
        }}
      >
        Name:
        <input
          type="text"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <br />
        Number:
        <input
          type="number"
          value={values.number}
          onChange={(e) => setValues({ ...values, number: e.target.value })}
        />
        <br />
        Quality-Score:
        <input
          type="number"
          value={values.quality}
          onChange={(e) => setValues({ ...values, quality: e.target.value })}
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setValues({ ...values, photo: e.target.files })}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
