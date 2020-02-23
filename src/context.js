import React, { Component } from 'react'
import items from './data'


const RoomContext = React.createContext()
// 
export default class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pet: false

    }

    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(room => room.price))
        let maxSize = Math.max(...rooms.map(room => room.size))
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize

        })
    }

    formatData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = {...item.fields, images, id}
            return room
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find(room => room.slug === slug)
        return room
    }

    handleChange = (e) => {
        const target = e.target
        const value = e.type === 'checkbox' ? target.checked : target.value
        const name = e.target.name
        
        this.setState({
            [name]: value
        },this.filterRooms)
    }

    filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state
        // all rooms
        let tempRooms = [...rooms]
        //transform value to number if necessary
        capacity = parseInt(capacity, 10)

        // filter by type
        if (type !== "all"){
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // filter by capacity
            // filter by type
            if (capacity !== 1){
                tempRooms = tempRooms.filter(room => room.capacity >= capacity)
            }
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

// HOC function
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value}/>}
            </RoomConsumer>
        )
    }
}

export{RoomProvider, RoomConsumer, RoomContext}