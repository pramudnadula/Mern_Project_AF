import React, { useEffect, useState } from 'react';
import { POST } from '../../Helper/httpHelper';
import { Popover, Button } from 'antd';

function GroupList(props) {

    const [groups, setgroups] = useState([])

    useEffect(() => {
        POST('api/studentGroups/allgroupsadmin').then((data) => {
            setgroups(data)
            console.log(data)
        }).catch((er) => {
            console.log(er)
        })
    }, [])

    const content = (stu) => {

        return (
            <div >
                {stu.map((m, i) => (
                    <p>{m.fname}</p>
                ))}

            </ div >
        )

    }


    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <h2 className='text-center'>Student Groups</h2>
                    <div className='col-12'>
                        <table className=' table table-bordered'>
                            <thead>
                                <tr>
                                    <th>No:</th>
                                    <th>Name</th>
                                    <th>Topic</th>
                                    <th>Area</th>
                                    <th>Members</th>
                                    <th>Supervisor</th>
                                    <th>Co-Supervisor</th>

                                </tr>
                            </thead>

                            <tbody>
                                {groups?.map((m, i) => (
                                    <tr key={i}>
                                        <td>{(i + 1)}</td>
                                        <td>{m?.grp.groupName}</td>
                                        <td>{m?.grp.topic ? <>{m.grp.topic}</> : <><div className='badge bg-danger'>Not Allocated</div></>}</td>
                                        <td>{m?.grp.area ? <>{m.grp.area.name}</> : <><div className='badge bg-danger'>Not Allocated</div></>}</td>
                                        <Popover placement="bottomRight" title="Members" content={content(m.stu)} trigger="click">
                                            <td><div className='badge bg-warning bdg' style={{ cursor: "pointer" }}>{m.grp.members}</div></td>
                                        </Popover>

                                        <td>{m?.grp.supervisor ? <>{m.grp.supervisor.fname}</> : <><div className='badge bg-danger'>Not Allocated</div></>}</td>

                                        <td>{m?.grp.cosupervisor ? <>{m.grp.cosupervisor.fname}</> : <><div className='badge bg-danger'>Not Allocated</div></>}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default GroupList;