import axios from "axios";
import { message } from 'antd'

export const getareas = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('http://localhost:8070/api/researchareas/list')
        dispatch({ type: "GET_ALL_AREAS", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}
