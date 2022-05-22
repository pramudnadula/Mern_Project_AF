import axios from "axios";
import React, { useEffect, useState } from "react";

function Evaluate(props) {
    const [markingScheme, setMarkingScheme] = useState();
    const [studentGroup, setStudentGroup] = useState();
    const [totalMarks, setTotalMarks] = useState();
    const [individualMark, setIndividualMark] = useState([]);
    const [remark, setRemark] = useState();
    const updateIndividualMark = (index, value) => {

        let newArray = [...individualMark];
        newArray[index] = value;
        setIndividualMark(newArray);

    };



    useEffect(() => {
        axios
            .get(
                `http://localhost:8070/api/markingscheme/view/6288fb93ae5365b142d65e08`
            )
            .then((res) => {
                setMarkingScheme(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(`http://localhost:8070/api/studentGroups/626cec367390cfb0c996cf1c`)
            .then((res) => {
                setStudentGroup(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const submit = (e) => {
        let total = 0;
        for (let i = 0; i < individualMark.length; i++) {
            total += Number(individualMark[i]);
        }
        console.log(individualMark)
        console.log(total)
        //setTotalMarks(total);
        const ob = {
            markingSchemeId: "6288fb93ae5365b142d65e08",
            groupId: "626cec367390cfb0c996cf1c",
            individualMark,
            totalMarks: total,
            remark,
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

        // window.location.href = "http://localhost:3000/";
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th><h2>{markingScheme?.name}</h2></th></tr>
                    <tr>
                        <th>Feature</th>
                        <th>Allocated Mark</th>
                        <th>Given Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {markingScheme &&
                        markingScheme?.features.map((featuresElement, index) => (
                            <tr key={index}>
                                <td>{featuresElement.feature}</td>
                                <td>{featuresElement.marks}</td>
                                <td>
                                    <input
                                        type="number"
                                        name="individualMark"
                                        required
                                        onChange={(e) => {
                                            updateIndividualMark(index, e.target.value);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Marks</th>
                        <td>{markingScheme?.total}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Remark</th>
                        <td></td>
                        <td>
                            <input
                                name="remark"
                                placeholder="Remark"
                                onChange={(e) => {
                                    setRemark(e.target.value);
                                }}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
            <button
                onClick={(e) => {
                    submit();
                }}
            >
                Save
            </button>
            <h2>Group Details</h2>
            Group Name: {studentGroup?.groupName} <br />
            Topic: {studentGroup?.topic} <br />
        </div>
    );
}

export default Evaluate;
