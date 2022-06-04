import React, { useEffect, useState } from 'react';
import Layout1 from '../Layouts/Layout1';
import '../Assets/Styles/home.css'
import Homecard from '../Components/GroupManagement/Homecard';
import { Descriptions } from 'antd';
import { GET, POST } from '../Helper/httpHelper';



function Home2(props) {
    const [analytics, setanalytics] = useState("")
    const [bestgroup, setbestgroup] = useState([])
    const [students, setstudents] = useState([])
    useEffect(() => {
        POST('api/studentGroups/analytics').then((data) => {
            setanalytics(data)

        }).catch((err) => {
            console.log(err)
        })

        POST('api/studentGroups/maxmarkgroup').then((res) => {
            setbestgroup(res.grp)
            setstudents(res.stu)
            console.log(res)
        }).catch((er) => {
            console.log(er)
        })
    }, [])
    return (
        <>
            <div className='container-fluid' style={{minHeight: 'calc(100vh - 3.37rem)',backgroundImage:'url("https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000")' }}>
                <div className='row'>
                    <h1 className='text-center'>Wall of Fame</h1>
                    <h6 className='text-center'>Highest Mark gruop</h6>
                    <div className='col-12'>
                        <div className='row'>

                            <div className='col-5 bg-info' style={{ borderRadius: '30px', marginLeft:'2rem'}}>
                                <img style={{ height: '250px'}} src={bestgroup?.length > 0 ? ("http://localhost:8070/" + bestgroup[0]?.groupId.image) : ("https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg")} className='img-fluid d-block' />
                            </div>
                            <div className='col-6 m-4 bg-info' style={{ borderRadius: '30px', paddingTop:'2rem'}}>
                                <Descriptions title="Group Information" layout="vertical">
                                    <Descriptions.Item label="Group Name"><h3>{bestgroup ? (bestgroup[0]?.groupId.groupName) : ("")}</h3></Descriptions.Item>
                                    <Descriptions.Item label="Members" span={2}>
                                        <ul>
                                            {students?.map((m, i) => (
                                                <li key={i}>{m?.fname}</li>
                                            ))}
                                        </ul>
                                    </Descriptions.Item>

                                </Descriptions>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>

                    <Homecard gcolor="90EE90" type="Students" count={analytics?.scount} setclass="fa-user-o" />
                    <Homecard gcolor="#FFA500" type="Supervisors" count={analytics?.sucount} setclass="fa-user-md" />
                    <Homecard gcolor="#EE82EE" type="Groups" count={analytics?.gcount} setclass="fa-users" />
                    <Homecard gcolor="#4169E1" type="Research Area" count={analytics?.acount} setclass="fa-graduation-cap" />
                </div>
            </div>
        </>
    );
}

export default Home2;