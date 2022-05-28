import axios from "axios";
import React, { useEffect, useState } from "react";

function Evaluate(props) {
    // const [markingScheme, setMarkingScheme] = useState();
    const [studentGroup, setStudentGroup] = useState();
    // const [individualMark, setIndividualMark] = useState([]);
    const [remark, setRemark] = useState();
    // const updateIndividualMark = (index, value) => {

    //     let newArray = [...individualMark];
    //     newArray[index] = value;
    //     setIndividualMark(newArray);

    // };

    const [markingScheme, setMarkingScheme] = useState();
    const [criteriaMarks, setCriteriaMarks] = useState([]);

    // const setCriteria = () => {

    //     console.log(markingScheme);
    //     if (markingScheme) {
    //         console.log(markingScheme);
    //         console.log(markingScheme?.features.length);

    //         for (let i = 0; i < markingScheme?.features.length; i++) {
    //             let newArray = [...criteriaMarks];
    //             console.log(markingScheme?.features[i].criterion);
    //             console.log(markingScheme?.features[i].allocatedMark);

    //             newArray.criterion = markingScheme?.features[i].criterion;
    //             newArray.allocatedMark = markingScheme?.features[i].allocatedMark;
    //             newArray.givenMark = "";
    //             setCriteriaMarks(newArray);

    //         }
    //     }
    // }





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
        // let total = 0;
        // for (let i = 0; i < criteriaMarks.length; i++) {
        //     total += Number(criteriaMarks.individualMark[i].givenMark);
        // }
        // console.log(individualMark)
        // console.log(total)
        const ob = {
            markingSchemeId: "6291cb82541b675281c67b9b",
            groupId: "6291eb500921479d2fabaeb3",
            criteriaMarks,
            totalMarks: 20,
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
                                    <input
                                        type="number"
                                        name="givenMark"
                                        required

                                        onChange={(e) => {
                                            featuresElement.givenMark = e.target.value;
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    {/* <tr>
                        <th>Total Marks</th>
                        <td>{markingScheme?.total}</td>
                        <td></td>
                    </tr> */}
                    <tr>
                        <th>Remark</th>

                        <td colSpan="2">
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
