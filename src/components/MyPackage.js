import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Modal, Form, FormGroup, ModalBody, ModalHeader, Input, Button, ListGroup, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';
import { Link } from 'react-router-dom';
export default class MyPackage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: false,
            visible1: false,
            packages: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            packageId: ''
        }
    }
    componentDidMount() {

        Axios.get('http://localhost:3001/packages/myPackage', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    packages: response.data
                })
            })
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })
    }
    deletePackage = (packageId) => {
        Axios.delete(`http://localhost:3001/packages/${packageId}`, this.state.config)
            .then((response) => {

                const filteredPackages = this.state.packages.filter((pkg) => {
                    return pkg._id !== packageId
                })
                this.setState({
                    visible1: true,
                    packages: filteredPackages
                })
            }).catch((err) => console.log(err.response));
    }

    render() {
        return (
            <div>
                <Navigation />
                <h1 className='text-center'>List of my package</h1>
                <Alert color="danger" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Package had been deleted.</Alert>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Package Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Agency Name</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.packages.map(pkg => {
                                return (<tr key={pkg._id}>
                                    <th scope="row">
                                        <img className='img-thumbnail'
                                            width='200px' src={`http://localhost:3001/uploads/${pkg.image}`}
                                            alt="profile" />
                                    </th>
                                    <td>{pkg.packagename}</td>
                                    <td>{pkg.price}</td>
                                    <td>{pkg.duration}</td>
                                    <td>{pkg.name}</td>
                                    <td>
                                        <Link to={`/editPackage/${pkg._id}`}>
                                            <button type="button" class="btn btn-primary" >Edit</button>
                                        </Link>
                                    </td>
                                    <td><button type="button" class="btn btn-danger"
                                        onClick={() => this.deletePackage(pkg._id)}>Delete</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <Footer />
            </div>
        )
    }
}
