import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { GET, POST } from "../../Helper/httpHelper";
import { Select } from "antd";
const { Option } = Select;

function AddMarkingScheme() {
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [fullAllocatedMarks, setFullAllocatedMarks] = useState("");
  let [inputFields, setInputFields] = useState([
    { criterion: "", allocatedMark: "" },
  ]);
  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [submissionType, setSubmissionType] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form:", values.features);
    inputFields = values.features;
    submit();
  };

  useEffect(() => {
    GET("api/submissiontype/")
      .then((data) => {
        console.log(data);
        setSubmissionTypes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submit = (e) => {
    console.log(inputFields);
    console.log(name);
    console.log(creator);
    console.log(fullAllocatedMarks);
    console.log(submissionType);
    const markingSchemeObject = {
      name,
      submissionType,
      fullAllocatedMarks,
      features: inputFields,
      creator,
    };
    console.log(markingSchemeObject);

    POST("api/markingscheme/add", markingSchemeObject)
      .then((data) => {
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.href = "http://localhost:1234/markingscheme/";
  };
  return (
    <div>
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Submission Type"
          required
          tooltip="This is a required field"
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={(key) => setSubmissionType(key)}
          >
            {submissionTypes &&
              submissionTypes?.map((featuresElement, index) => (
                <Option key={index} value={featuresElement.submissionType}>
                  {featuresElement.submissionType}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Name" required tooltip="This is a required field">
          <Input
            placeholder="Marking Scheme Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>

        <Form.List name="features">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    label="Criterion"
                    required
                    tooltip="This is a required field"
                    {...restField}
                    name={[name, "criterion"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing Criterion",
                      },
                    ]}
                  >
                    <Input placeholder="Criterion" />
                  </Form.Item>
                  <Form.Item
                    label="Allocated Mark"
                    required
                    tooltip="This is a required field"
                    {...restField}
                    name={[name, "allocatedMark"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing Allocated Mark",
                      },
                    ]}
                  >
                    <Input placeholder="Allocated Mark" type="number" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label="Total Marks Allocated"
          required
          tooltip="This is a required field"
        >
          <Input
            placeholder="Total Marks Allocated"
            type="number"
            onChange={(e) => {
              setFullAllocatedMarks(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Creator" required tooltip="This is a required field">
          <Input
            placeholder="Created By"
            onChange={(e) => {
              setCreator(e.target.value);
            }}
          />
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
