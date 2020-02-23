import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';

export default class DetailPackage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            packages: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3001/packages/' + (this.props.match.params.id), this.state.config)
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

    render() {
        return (
            <div>
                <FormGroup>
                    <img className='img-thumbnail'
                        width='400' src={`http://localhost:3001/uploads/${this.state.packages.image}`}
                        alt="Property Image" />
                </FormGroup>
                <p >{this.state.packages.packagename}</p>
                <p >{this.state.packages.price}</p>
                <p >{this.state.packages.duration}</p>
                <p >{this.state.packages.participants}</p>
                <p >{this.state.packages.desc}</p>
                <label htmlFor="heighlight">Highlights</label>
                <p >{this.state.packages.heighlight1}</p>
                <p >{this.state.packages.heighlight2}</p>
                <p >{this.state.packages.heighlight3}</p>
                <p >{this.state.packages.transportation}</p>
                <label htmlFor="">Contact detail</label>
                <p >{this.state.packages.phone}</p>
                <p >{this.state.packages.name}</p>
            </div>
        )
    }
}
