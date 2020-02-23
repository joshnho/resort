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
               {/* select type */}
               <div className="form-group">
                   <label htmlFor="type">room type</label>
                   <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                       {types}
                   </select>
               </div>
               {/* end select type */}
               {/* guests */}
               <div className="form-group">
                   <label htmlFor="capacity">guests</label>
                   <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                       {guests}
                   </select>
               </div>
               {/* guests */}

           </form>
        </section>
    )
}
