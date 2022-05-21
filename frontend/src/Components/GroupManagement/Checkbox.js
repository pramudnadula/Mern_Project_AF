import React, { useState } from "react";

function Checkbox({ areas, handleFilters }) {
    const [checked, setchecked] = useState([])

    const handleToggle = c => {
        const currentcategoryId = checked.indexOf(c)
        const newcheckedcategoryid = [...checked]

        if (currentcategoryId === -1) {
            newcheckedcategoryid.push(c)
        }
        else {
            newcheckedcategoryid.splice(currentcategoryId, 1)
        }

        setchecked(newcheckedcategoryid)
        handleFilters(newcheckedcategoryid)
    }
    return areas.map((c, i) => (
        <div className='form-inline d-flex align-items-center py-1' key={i}>

            <label className='tick'>{c.name}
                <input type='checkbox' className='form-check-input' onChange={(e) => { handleToggle(c._id) }} value={checked.indexOf(c._id === -1)} />
                <span className="check" />
            </label>
        </div>
    ))
}
export default Checkbox;