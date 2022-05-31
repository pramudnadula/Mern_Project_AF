import React from 'react';

function DetailsCard({ stu, grp }) {
    return (
        <div className='col-12'>
            <div className='row justify-content-center'>
                <h3 className='text-center'>Group Details</h3>
                <div className='col-8 det_card p-4'>


                    <table className='table table-hover bg-light'>
                        <tbody>
                            <tr>
                                <td>Group Name</td>
                                <th>{grp.groupName}</th>
                            </tr>
                            <tr>
                                <td>Group Topic</td>
                                <th>{grp.topic ? grp.topic : "Topic Not yet dicided"}</th>
                            </tr>

                        </tbody>
                    </table>

                    <table style={{ textAlign: "center" }} className='table table-hover bg-light mt-4'>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        <tbody>
                            {stu?.map((st, i) => (
                                <tr key={i}>
                                    <td>{st.fname}</td>
                                    <td>{st.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default DetailsCard;