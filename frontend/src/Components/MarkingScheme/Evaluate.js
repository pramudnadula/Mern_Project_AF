import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space } from 'antd';

function Evaluate(props) {

    const [studentGroup, setStudentGroup] = useState();
    const [remark, setRemark] = useState();
    const [marker, setMarker] = useState();
    const [markingScheme, setMarkingScheme] = useState();
    const [criteriaMarks, setCriteriaMarks] = useState([]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:8070/api/markingscheme/view/6291cb82541b675281c67b9b`
            )
            .then((res) => {
                console.log(res.data);
                setMarkingScheme(res.data);
                var arr = [];
                for (let i = 0; i < res.data.features.length; i++) {
                    let newArray = { criterion: "", allocatedMark: "", givenMark: "", };


                    console.log(res.data.features[i].criterion);
                    console.log(res.data.features[i].allocatedMark);

                    newArray.criterion = res.data.features[i].criterion;
                    newArray.allocatedMark = res.data.features[i].allocatedMark;
                    newArray.givenMark = "";
                    console.log(newArray);

                    arr.push(newArray);

                }
                console.log(criteriaMarks);
                setCriteriaMarks(arr);

            })
            .catch((err) => {
                console.log(err);
            });



        axios
            .get(`http://localhost:8070/api/studentGroups/6291eb500921479d2fabaeb3`)
            .then((res) => {
                setStudentGroup(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const submit = (e) => {
        let total = 0;
        for (let i = 0; i < criteriaMarks.length; i++) {
            total += Number(criteriaMarks[i].givenMark);
        }
        console.log(total)
        const ob = {
            markingSchemeId: "6291cb82541b675281c67b9b",
            groupId: "6291eb500921479d2fabaeb3",
            criteriaMarks,
            totalMarks: total,
            remark,
            marker,
        };
        console.log(ob);
        axios
            .post("http://localhost:8070/api/evoluate/", ob)
            .then((data) => {
                alert("Success");
            })
            .catch((err) => {
                console.log(err);
            });

        //window.location.href = "http://localhost:3000/";
    };

    return (
        <div>

            <table class="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th colSpan="3"><h2>{markingScheme?.name}</h2></th>
                    </tr>
                    <tr>
                        <th colSpan="3"><h3>Student Group: {studentGroup?.groupName}</h3></th>
                    </tr>
                    <tr>
                        <th>Feature</th>
                        <th>Allocated Mark</th>
                        <th>Given Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {criteriaMarks &&
                        criteriaMarks?.map((featuresElement, index) => (
                            <tr key={index}>
                                <td>{featuresElement?.criterion}</td>
                                <td>{featuresElement?.allocatedMark}</td>
                                <td>
                                    <Form.Item label=" " required tooltip="This is a required field"
                                    >
                                        <input
                                            type="number"
                                            name="givenMark"
                                            required

                                            onChange={(e) => {
                                                featuresElement.givenMark = e.target.value;
                                            }}
                                        />
                                    </Form.Item>
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Remark</th>

                        <td colSpan="2">
                            <Form.Item label=" " required tooltip="This is a required field"
                            >
                                <input
                                    name="remark"
                                    placeholder="Remark"
                                    onChange={(e) => {
                                        setRemark(e.target.value);
                                    }}
                                />
                            </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <th>Marked By:</th>

                        <td colSpan="2">
                            <Form.Item label=" " required tooltip="This is a required field"
                            >
                                <input
                                    name="marker"
                                    placeholder="Marked By"
                                    onChange={(e) => {
                                        setMarker(e.target.value);
                                    }}
                                />
                            </Form.Item>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <button type="button" class="btn btn-secondary btn-sm"
                onClick={(e) => {
                    submit();
                }}
            >
                Save
            </button>
        </div>
    );
}

export default Evaluate;
