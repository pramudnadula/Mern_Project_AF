import axios from "axios";
// import { TokenExpired } from "../components/rediraction";

export const GET = async (path) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.get(path, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        return response.data;
    }
    catch (error) {
        if (error.response.status === 401) {
            //TokenExpired();
        } else {
            console.log(error);
            return error.response.data;
        }
    }
};

export const POST = async (path, data) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.post(path, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        return response.data;
    }
    catch (error) {
        if (error.response.status === 401) {
            // TokenExpired();
        } else {
            console.log(error);
            return error.response.data;
        }
    }
};

export const DELETE = async (path, data) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.delete(path, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: data
        });
        return response.data;
    }
    catch (error) {
        if (error.response.status === 401) {
            // TokenExpired();
        } else {
            console.log(error);
            return error.response.data;
        }
    }
};

export const PUT = async (path, data) => {
    path = `http://localhost:8070/${path}`;
    try {
        const response = await axios.put(path, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        return response.data;
    }
    catch (error) {
        if (error.response.status === 401) {
            //   TokenExpired();
        } else {
            console.log(error);
            return error.response.data;
        }
    }
};

// export const IsLoggedIn = async () => {
//     const res = await this.POST("auth/validate-token", null);
//     if (res.status === 200) {
//         return true;
//     }
//     return false;
// }