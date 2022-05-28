import React, { useState } from "react";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

function AddMarkingScheme() {

  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [fullAllocatedMarks, setFullAllocatedMarks] = useState("");
  let [inputFields, setInputFields] = useState([{ criterion: "", allocatedMark: "" }]);

  const onFinish = (values) => {
    console.log('Received values of form:', values.features);
    inputFields = values.features;
    submit();
  };


  const submit = (e) => {
    console.log(inputFields);
    console.log(name);
    console.log(creator);
    console.log(fullAllocatedMarks);
    const markingSchemeObject = {
      name,
      fullAllocatedMarks,
      features: inputFields,
      creator,
    };
    axios
      .post("http://localhost:8070/api/markingscheme/add", markingSchemeObject)
      .then((data) => {
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.href = "http://localhost:1234/markingscheme/";
  };

  return (
    // <div>
    //   <h1>Add Marking Scheme</h1>
    //   <form onSubmit={submit}>
    //     <h3>Marking Scheme Name</h3>
    //     <input
    //       type="text"
    //       name="name"
    //       id="name"
    //       required
    //       onChange={(e) => {
    //         setName(e.target.value);
    //       }}
    //     />
    //     <br />
    //     <h3>Feature and Mark</h3>
    //     {inputFields.map((input, index) => {
    //       return (
    //         <div key={index}>
    //           <input
    //             name="criterion"
    //             placeholder="Criterion"
    //             required
    //             value={input.criterion}
    //             onChange={(event) => handleFormChange(index, event)}
    //           />
    //           <input
    //             type="number"
    //             name="allocatedMark"
    //             required
    //             placeholder="Allocated Marks"
    //             value={input.allocatedMark}
    //             onChange={(event) => handleFormChange(index, event)}
    //           />
    //           <button onClick={(e) => removeFields(index)}>Remove</button>
    //         </div>
    //       );
    //     })}
    //     <button
    //       onClick={(e) => {
    //         addFields();
    //       }}
    //     >
    //       Add More..
    //     </button>
    //     <h3>Total Marks Allocated</h3>
    //     <input
    //       type="number"
    //       name="total"
    //       id="total"
    //       required
    //       onChange={(e) => {
    //         setFullAllocatedMarks(e.target.value);
    //       }}
    //     />
    //     <br />

    //     <button
    //       onClick={(e) => {
    //         submit();
    //       }}
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <div>
      <Form name="dynamic_form_nest_item" autoComplete="off" onFinish={onFinish}>
        <Form.Item label="Name" required tooltip="This is a required field"
        >
          <Input placeholder="Marking Scheme Name" onChange={(e) => {
            setName(e.target.value);
          }} />
        </Form.Item>

        <Form.List name="features">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    label="Criterion" required tooltip="This is a required field"
                    {...restField}
                    name={[name, 'criterion']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Criterion',
                      },
                    ]}
                  >
                    <Input placeholder="Criterion" />
                  </Form.Item>
                  <Form.Item
                    label="Allocated Mark" required tooltip="This is a required field"
                    {...restField}
                    name={[name, 'allocatedMark']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing Allocated Mark',
                      },
                    ]}
                  >
                    <Input placeholder="Allocated Mark" type="number" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Total Marks Allocated" required tooltip="This is a required field"
        >
          <Input placeholder="Total Marks Allocated" type="number" onChange={(e) => {
            setFullAllocatedMarks(e.target.value);
          }} />
        </Form.Item>
        <Form.Item label="Creator" required tooltip="This is a required field"
        >
          <Input placeholder="Created By" onChange={(e) => {
            setCreator(e.target.value);
          }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>


  );
}

export default AddMarkingScheme;
