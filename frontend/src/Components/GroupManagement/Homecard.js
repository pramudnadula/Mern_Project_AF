import React from 'react';

function Homecard({ gcolor, count, type, setclass }) {

    const colorstyle = {
        color: gcolor
    }
    return (
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <div className="card">
                <div className="card-content">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <i className={`fa homeicon ${setclass}`} style={colorstyle} aria-hidden="true"></i>
                            </div>
                            <div className="col-6">
                                <h3>{count}</h3>
                                <span>{type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homecard;