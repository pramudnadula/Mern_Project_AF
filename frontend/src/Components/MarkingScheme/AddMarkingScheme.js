import React, { useState } from "react";
import axios from "axios";

function AddMarkingScheme() {
  const [inputFields, setInputFields] = useState([{ feature: "", marks: "" }]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { feature: "", marks: "" };

    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
    console.log(name);
    console.log(total);
    const ob = {
      name,
      total,
      features: inputFields,
    };
    axios
      .post("http://localhost:8070/api/markingscheme/add", ob)
      .then((data) => {
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.href = "http://localhost:3000/markingscheme/";
  };

  return (
    <div>
      <h1>Add Marking Scheme</h1>
      <form onSubmit={submit}>
        <h3>Marking Scheme Name</h3>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <h3>Feature and Mark</h3>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input
                name="feature"
                placeholder="Feature"
                required
                value={input.feature}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                type="number"
                name="marks"
                required
                placeholder="Allocated Marks"
                value={input.marks}
                onChange={(event) => handleFormChange(index, event)}
              />
              <button onClick={(e) => removeFields(index)}>Remove</button>
            </div>
          );
        })}
        <button
          onClick={(e) => {
            addFields();
          }}
        >
          Add More..
        </button>
        <h3>Total Marks Allocated</h3>
        <input
          type="number"
          name="total"
          id="total"
          required
          onChange={(e) => {
            setTotal(e.target.value);
          }}
        />
        <br />

        <button
          onClick={(e) => {
            submit();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMarkingScheme;
