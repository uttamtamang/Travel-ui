import React, { Component } from 'react'
import Navigation from './Navigation'
import Axios from 'axios'
import { Form, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import FileUploadButton from './FileUploadButton'
import Footer from './Footer';

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/users/me', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/dashboard');
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    render() {
        if (this.state.user === null) {
            return <h3>Loading ...</h3>
        } else {
            return (
                <div>
                    <Navigation />
                    <Container className='mt-4'>
                        <div className="editProfile">
                            <Form>
                                <FormGroup>
                                    <Label for='fullname'>Full Name</Label>
                                    <Input type='text'
                                        id="fullName"
                                        name='fullName'
                                        value={this.state.user.fullName}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='phone'>Phone Number</Label>
                                    <Input type='text' id='phone'
                                        name='phone'
                                        value={this.state.user.phone}
                                        onChange={(e) => this.handleChange(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='email'>Email</Label>
                                    <Input type='text' id='email'
                                        name='email'
                                        value={this.state.user.email}
                                        onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <Button color='danger' onClick={this.updateUser} block>Update User</Button>
                            </Form>
                        </div>

                    </Container>
                    <Footer />
                </div>
            )
        }
    }
}
