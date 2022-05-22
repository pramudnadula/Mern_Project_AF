import axios from "axios";
import { message } from 'antd'

export const getstudents = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('http://localhost:8070/user/getnotassigend')
        dispatch({ type: "GET_ALL_STU", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const checkstudent = (gid, sid) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get(`http://localhost:8070/api/studentGroups/${gid}/isexist/${sid}`);
        message.success("exist")

        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
        console.log(error)
        message.error("not exist")
    }
}

