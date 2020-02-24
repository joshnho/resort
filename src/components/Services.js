import React, { Component } from 'react'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'
import Title from './Title'

export default class Services extends Component {
    state = {
        services: [
                {
                icon:  <FaCocktail />,
                title: "Free Cocktails",
                info: 'Enjoy unlimited free drinks for the entire duration of your stay!'
                },
                {
                icon:  <FaHiking />,
                title: "Hiking",
                info: 'Complementary passes for each person to our hiking tour!'
                },
                {
                icon:  <FaShuttleVan />,
                title: "Free Shuttle",
                info: 'No ride? No Problem! We provide free shuttle rides to and from the main bus terminal!'
                },
                {
                icon:  <FaBeer />,
                title: "Beautiful Beaches",
                info: 'Get your tan on all year round with access to our private beaches!'
                }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>

            </section>
        )
    }
}
