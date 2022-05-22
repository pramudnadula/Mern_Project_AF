import React from 'react';
import '../../Assets/Styles/addgroup.css';
function CreateGroup(props) {

    let data = new FormData()

    const upload = ({ target: { files } }) => {
        var up = document.getElementById("upload-label")
        up.innerHTML = files[0].name
        data.append("studentImage", files[0]);
        data.append("imgname", files[0].name);
    }
    return (
        <div className='container-fluid '>
            <div className='row justify-content-center'>
                <div className='col-12 mt-5'>
                    <h2 className='text-center'>Create a Student Group</h2>
                </div>
                <div className='col-6'>
                    <form className='addnewgroup'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Group Number</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Group Number" />
                            <small id="emailHelp" className="form-text text-muted">Group number provided by SLIIT.</small>
                        </div>
                        <br />

                        <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                            <input id="upload" type="file" onChange={upload} class="form-control border-0" />
                            <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose Group Image</label>
                            <div class="input-group-append">
                                <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                            </div>
                        </div>



                    </form>
                </div>
            </div>

        </div>
    );
}

export default CreateGroup;