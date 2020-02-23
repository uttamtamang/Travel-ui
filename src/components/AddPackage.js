import React, { Component } from 'react'

import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class AddPackage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            user: {},
            package: {},
            image: null,
            packagename: null,
            duration: null,
            price: null,
            participants: null,
            tAgency: null,
            desc: null,
            heighlight1: null,
            heighlight2: null,
            heighlight3: null,
            transportation: null,
            phone: null,
            name: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    image: response.data.filename
                })
            }).catch((err) => console.log(err.response))
    }

    addPackage = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3001/packages',
            {
                image: this.state.image,
                packagename: this.state.packagename,
                duration: this.state.duration,
                price: this.state.price,
                participants: this.state.participants,
                tAgency: this.state.user._id,
                desc: this.state.desc,
                heighlight1: this.state.heighlight1,
                heighlight2: this.state.heighlight2,
                heighlight3: this.state.heighlight3,
                transportation: this.state.transportation,
                phone: this.state.phone,
                name: this.state.name,
            }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible1: true,
                    image: '',
                    packagename: '',
                    duration: '',
                    price: '',
                    participants: '',
                    tAgency: '',
                    desc: '',
                    heighlight1: '',
                    heighlight2: '',
                    heighlight3: '',
                    transportation: '',
                    phone: '',
                    name: '',
                })
            })
            .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div>
                <div>
                    <Navigation />
                    <h1 className="mb-3 mt-3 text-muted text-center">Add package.</h1>
                    <div class="addpackage">

                        <Form>
                            <FormGroup>
                                <label for="packagename">Name Of the package</label>
                                <Input type='text' name='packagename' id='packagename'
                                    value={this.state.packagename}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="duration">duration Of the Album</label>
                                <Input type='text' name='duration' id='duration' value={this.state.duration}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="price">Price Of the package</label>
                                <Input type='text' name='price' id='price' value={this.state.price}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="participants">Min no of participants</label>
                                <Input type='text' name='participants' id='participants' value={this.state.participants}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="desc">desc</label>
                                <Input type='text' name='desc' id='desc' value={this.state.desc}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight1">heighlight1</label>
                                <Input type='text' name='heighlight1' id='heighlight1' value={this.state.heighlight1}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight2">heighlight2</label>
                                <Input type='text' name='heighlight2' id='heighlight2' value={this.state.heighlight2}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight3">heighlight3</label>
                                <Input type='text' name='heighlight3' id='heighlight3' value={this.state.heighlight3}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="transportation">transportation</label>
                                <Input type='text' name='transportation' id='transportation' value={this.state.transportation}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="phone">phone</label>
                                <Input type='text' name='phone' id='phone' value={this.state.phone}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="name">name</label>
                                <Input type='text' name='name' id='name' value={this.state.name}
                                    onChange={this.handleChange} required />
                            </FormGroup>

                            <label>Please Select Image of your package</label>
                            <FormGroup>
                                <CustomInput type='file' id='image'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Package Added Successfully. </Alert>
                            </FormGroup>
                            <Button color="primary" type="submit" onClick={this.addPackage}>Add Package</Button>
                        </Form>

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
