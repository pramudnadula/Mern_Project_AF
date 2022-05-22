import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateGroup from '../Components/GroupManagement/CreateGroup';
import Spinner from '../Components/GroupManagement/Spinner';
import Wall from '../Components/GroupManagement/Wall';

function StudentGroup(props) {

    const userid = localStorage.getItem("user");
    const gid = localStorage.getItem("gid")
    const [user, setuser] = useState()
    const [groupid, setgroupid] = useState()
    const { loading } = useSelector(state => state.alert);
    let f;
    if (gid === "") {
        f = true;
    }

    useEffect(() => {
        axios.get(`http://localhost:8070/user/getuser/${userid}`).then((data) => {
            setuser(data.data)
            console.log(data.data.user)
            setgroupid(data.data.user.groupid)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>

            {groupid ? <>
                <Wall group={groupid} uid={userid} />
            </> : <>
                {f ? <></> : <>
                    <Spinner />
                </>}


            </>}

            {f ? <>
                <CreateGroup />
            </> : ""}


        </div>
    );
}

export default StudentGroup;