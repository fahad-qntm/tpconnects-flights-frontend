import React, { Component } from 'react'

import NavBar from '../../../Components/NavBar'
import Cover from '../../Home/Components/Cover'
import Footer from '../../../Components/Footer'

import './flights.scss'
import FlightList from './FlightList'

export default class Flights extends Component {
    render() {
        return (
            <div className='flights'>
                <NavBar url='dashboard' />
                <Cover />
                <FlightList {...this.props} />
                <Footer url='flights' />
            </div>
        )
    }
}
