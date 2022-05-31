import React, { useState } from "react";

function Checkbox({ areas, handleFilters }) {
    const [checked, setchecked] = useState([])

    const handleToggle = r => {
        const currentcategoryId = checked.indexOf(r)
        const newcheckedcategoryid = [...checked]

        if (currentcategoryId === -1) {
            newcheckedcategoryid.push(r)
        }
        else {
            newcheckedcategoryid.splice(currentcategoryId, 1)
        }

        setchecked(newcheckedcategoryid)
        handleFilters(newcheckedcategoryid)
    }
    return areas?.map((r, i) => (
        <div className='title is-6  has-text-white form-inline d-flex align-items-center py-1' key={i}>

            <input type='checkbox' className='checkbox' onChange={(e) => { handleToggle(r._id) }} value={checked.indexOf(r._id === -1)} />
            <label className='tick ml-5'>{r.name}</label>
            <span className="check" />

        </div>
    ))
}
export default Checkbox;