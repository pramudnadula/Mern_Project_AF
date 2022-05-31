import React from 'react';

function Homecard({ gcolor, count, type, setclass }) {

    const colorstyle = {
        color: gcolor
    }
    return (
        <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <i class={`fa homeicon ${setclass}`} style={colorstyle} aria-hidden="true"></i>
                            </div>
                            <div class="col-6">
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