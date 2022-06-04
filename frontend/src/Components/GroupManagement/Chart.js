import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { GET, POST } from '../../Helper/httpHelper';

function Chart({ gid }) {

    const [marks, setmarks] = useState([])

    useEffect(() => {

        POST('api/studentGroups/marks', { gid }).then((data) => {

            if (data?.length > 0) {
                const display = {
                    name: "",
                    mark: 0
                }
                let arr = []
                for (let i = 0; i < data?.length; i++) {
                    let mar = Object.assign({}, display)

                    mar.name = data[i]?.markingSchemeId.submissionType
                    mar.mark = data[i]?.totalMarks
                    arr.push(mar)
                }
                console.log(arr)
                setmarks(arr)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])



    const DemoLine = (data) => {



        const config = {
            data,
            xField: 'name',
            yField: 'mark',
            label: {},
            point: {
                size: 5,
                shape: 'diamond',
                style: {
                    fill: 'white',
                    stroke: '#5B8FF9',
                    lineWidth: 2,
                },
            },
            tooltip: {
                showMarkers: true,
            },
            state: {
                active: {
                    style: {
                        shadowBlur: 4,
                        stroke: '#000',
                        fill: 'red',
                    },
                },
            },
            interactions: [
                {
                    type: 'marker-active',
                },
            ],
        };
        return <Line {...config} />;
    };
    return (
        <div>
            {marks?.length > 0 ? <>
                {DemoLine(marks)}
            </> : <>
                <h4 style={{ color: "grey" }} className="mt-5 text-center">No Submission Added for marking</h4>
            </>}

        </div>
    );
}

export default Chart;