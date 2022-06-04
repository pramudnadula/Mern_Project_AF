import axios from "axios";
import { message } from 'antd'
export const getfiltersupervisors = (skip, limit, filters, isSupervisor) => {
    const data = {
        limit,
        skip,
        filters,
        isSupervisor
    }
    return fetch('http://localhost:8070/api/supervisors/by/search', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (localStorage.getItem("token") || localStorage.getItem("staff-token")||(localStorage.getItem("admin-token"))),
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}