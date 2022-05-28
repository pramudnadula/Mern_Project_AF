import axios from "axios";
import { message } from 'antd'
import { GET } from "../Helper/httpHelper";

export const getareas = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await GET('api/researchareas/list')
        dispatch({ type: "GET_ALL_AREAS", payload: response })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}
