import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

// get all unique value
const getUnique = (arr, value) => {
    return [...new Set(arr.map(item => item[value]))]
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext)
    const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context
    // get unique types
    let types = getUnique(rooms,'type')
    // add all
    types = ['all', ...types]
    // map to jsx
    types = types.map((type, index) => {
        return <option value={type} key={`type-${index}`}>{type}</option>
    })

    let guests = getUnique(rooms, 'capacity')
    guests = guests.map((item, index) => {
        return <option key={`guests-${index}`} value={item}>{item}</option>
    })

    return (
        <section className="filter-container">
           <Title title="search rooms" />
           <form className="filter-form">
               {/* select type filter */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* guests/capacity filter */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {guests}
                    </select>
                </div>
                {/* end of guests */}
                {/* room price filter */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
                </div>
                {/* end of room price */}
                {/* room size filter */}
                    <div className="form-group">
                        <label htmlFor="size">room size</label>
                        <div className="size-inputs">
                            <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                            <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                        </div>
                    </div>
                {/* end of size */}
                {/* extras filter */}
                    <div className="form-group">
                        <div className="single-extra">
                            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                            <label htmlFor="breakfast">breakfast</label>
                        </div>
                        <div className="single-extra">
                            <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                            <label htmlFor="pets">pets</label>
                        </div>
                    </div>
                {/* end of extras */}
           </form>
        </section>
    )
}
