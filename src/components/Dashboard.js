import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Axios from 'axios';
import Navigation from './Navigation';
import Footer from './Footer';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    render() {
        return (
            <div >
                <Navigation />
                <p><Link to='/addPackage'>Add Package</Link></p>
                <p><Link to='/allPackage'>View Packages</Link></p>
                <p><Link to='/myPackage'>My Packages</Link></p>
                <p><Link to='/profile'>Edit Profile</Link></p>
                <Footer />
            </div>
        )
    }
}
