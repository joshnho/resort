import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
    state = {
        slug: this.props.match.params.slug,
        defaultBcg
    }

    static contextType = RoomContext

    render() {
        const {getRoom} = this.context
        const room = getRoom(this.state.slug)

        if (!room){
            return <div className="error">
                        <h3>Room not found</h3>
                        <Link to="/rooms" className="btn-primary">Back to Rooms</Link>
                    </div>
        }

        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room
        
        return (
            <>
                <StyledHero img={images[0] || this.state.defaultBcg}>
                    <Banner title={`${name} Room`}>
                        <Link to="/rooms" className="btn-primary">Back to Rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {images.map((img, i) => {
                            return <img key={`img-${i}`} src={img} alt={name} />
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Details:</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Info:</h3>
                            <h6>Price : ${price}</h6>
                            <h6>Size : {size} SQFT</h6>
                            <h6>Max Capacity : {capacity} {capacity >1 ? "People" : "Person"}</h6>
                            <h6>Pets : {pets ? "Pets allowed" : "No pets allowed"}</h6>
                            <h6>{breakfast ? "Breakfast : Free breakfast" : null}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>Included with all rooms :</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key={`extraItem-${index}`}>- {item}</li>
                        })}
                    </ul>
                </section>
            </>
        )
    }
}
