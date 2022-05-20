import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/chat.css'
import img1 from '../../Assets/Images/user1.png';
function Conversations({ conversation, curentuserid }) {
    const [student, setStudent] = useState({})

    useEffect(() => {
        const friendid = conversation.members.find((m) => m !== curentuserid)
        const getuser = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/api/stu/get/${friendid}`);
                setStudent(res.data[0])


            } catch (error) {
                console.log(error)
            }

        }
        getuser()

    }, [conversation, curentuserid])
    return (
        <div className='conversation'>
            <img className='conversation_img' src={img1} />
            <span className='conversation_name'>
                {student?.name}
            </span>

        </div>
    );
}

export default Conversations;