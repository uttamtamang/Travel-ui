import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
export default class ListPackage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            packages: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            propertyId: ''
        }
    }

    componentDidMount() {

        Axios.get('http://localhost:3001/packages', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    packages: response.data
                })
            })
            .catch((err) => console.log(err.response));


        Axios.get('http://localhost:3001/users/myProfile', this.state.config)
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
    render() {
        return (
            <div>
                <Navigation />
                <h2 className="mb-3 mt-3 text-muted text-center">List of Packages</h2>

                <div className="AllPropTable">
                    <table className="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Package</th>
                                <th scope="col">Price</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Travel Agent</th>
                                <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.packages.map(pkg => {
                                    return (<tr key={pkg._id}>
                                        <th scope="row">
                                            <img className='img-thumbnail '
                                                width='200px' src={`http://localhost:3001/uploads/${pkg.image}`}
                                                alt="profile" />
                                        </th>
                                        <td>{pkg.packagename}</td>
                                        <td>{pkg.price}</td>
                                        <td>{pkg.duration}</td>
                                        <td>{pkg.phone}</td>
                                        <td>{pkg.name}</td>

                                        <td>
                                            <Link to={`/detailPackage/${pkg._id}`}>
                                                <button type="button" class="btn btn-primary" >Details</button>
                                            </Link>
                                        </td>

                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
