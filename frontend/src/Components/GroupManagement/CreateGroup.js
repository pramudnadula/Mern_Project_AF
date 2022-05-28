import { Alert, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import '../../Assets/Styles/addgroup.css';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
function CreateGroup(props) {
    const uid = localStorage.getItem("user")
    let data = new FormData()
    const [name, setname] = useState('')
    const [gid, setgid] = useState()

    const upload = ({ target: { files } }) => {
        var up = document.getElementById("upload-label")
        up.innerHTML = files[0].name
        data.append("studentImage", files[0]);
        data.append("imgname", files[0].name);
    }

    const hanldedata = (e) => {
        e.preventDefault()
        data.append("uid", uid)
        data.append("name", name)

        axios.post('http://localhost:8070/api/studentGroups/', data).then((res) => {
            message.success("group created successfully")
            localStorage.setItem("gid", res.data.gid)
            window.location.reload(false)

        }).catch((err) => {
            console.log(err)
        })


    }
    return (
        <div className='container-fluid '>
            <div className='row justify-content-center'>
                <div className='col-12 mt-5'>
                    <h2 className='text-center'>Create a Student Group</h2>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-8 col-sm-10 col-12'>
                    <form className='addnewgroup p-5'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Group Number</label>
                            <input required type="text" onChange={(e) => { setname(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Group Number" />
                            <small id="emailHelp" className="form-text text-muted">Group number provided by SLIIT.</small>
                        </div>
                        <br />


                        <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input required id="upload" type="file" onChange={upload} className="form-control border-0" />
                            <label id="upload-label" for="upload" className="font-weight-light text-muted">Choose Group Image</label>
                            <div className="input-group-append">
                                <label for="upload" className="btn btn-light m-0 rounded-pill px-4"> <i className="fa fa-cloud-upload mr-2 text-muted"></i><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>

                            </div>
                        </div>

                        <h4 className='text-center'>  <Popconfirm placement="bottom" title="When you create a group you cannot Leave from the group" onConfirm={hanldedata} okText="Ok" cancelText="Cancel"><input type="submit" value="create" className='btn btn-warning' /></Popconfirm></h4>

                    </form>
                </div>
            </div>
            <div className='row justify-content-center'>
                <h4 className='text-center mt-4'>OR</h4>
                <div className='col-8 mt-4'>
                    <Alert
                        type='info'
                        banner
                        message={
                            <Marquee pauseOnHover gradient={false}>
                                Ask your team member to send a request to you via their group
                            </Marquee>
                        }
                    />
                </div>
            </div>

        </div>
    );
}

export default CreateGroup;