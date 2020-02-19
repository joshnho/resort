import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import {RoomConsumer} from '../context'
import Loading from './Loading'

export default function RoomContainer() {
    return (
        
        <div>
            Hello from rooms container
            <RoomsFilter />
            <RoomsList />
        </div>
    )
}
