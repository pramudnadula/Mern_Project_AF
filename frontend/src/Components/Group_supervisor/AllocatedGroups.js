import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/sup.css'
function AllocatedGroups(props) {
    const [groups, setgroups] = useState([])
    const sid = localStorage.getItem("staff")
    useEffect(() => {
        axios.get(`http://localhost:8070/api/studentGroups/groups/${sid}`).then((data) => {
            setgroups(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                {groups?.map((m, i) => (

                    <div className="card col-8 group_card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">{m?.groupName}</h5>
                            <p className="card-text">{m.topic ? m.topic : "Topic Not Yet Allocated"}</p>
                            <span className="badge bg-success">{m.area ? m.area.name : "Research area Not Disigned"}</span>

                        </div>
                    </div>



                ))}
            </div>
        </div>
    );
}

export default AllocatedGroups;