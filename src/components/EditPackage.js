import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'
import Navigation from './Navigation';
import Footer from './Footer';

export default class EditPackage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            visible2: false,
            user: {},
            packages: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            packages: { ...this.state.packages, [e.target.name]: e.target.value }
        })
    }
    //LOAD DATA
    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:3001/packages/' + (this.props.match.params.id), this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    packages: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    //ALERT MANAGEMENT FUNCTION
    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })

    }

    //For Image
    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    packages: { ...this.state.packages, image: response.data.filename },
                    visible1: true,
                })
            }).catch((err) => console.log(err.response))
    }

    updatePackage = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/packages/' + (this.props.match.params.id), this.state.packages, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible2: true
                })
            })
            .catch((err) => console.log(err.response))
        this.props.history.push('/myPackage');
    }


    render() {
        return (
            <div>
                <div>
                    <Navigation />
                    <h1 className="mb-3 mt-3 text-muted text-center">Update package.</h1>
                    <div class="addpackage">

                        <Form>
                            <FormGroup>
                                <label for="packagename">Name Of the package</label>
                                <Input type='text' name='packagename' id='packagename'
                                    value={this.state.packages.packagename}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="duration">duration Of the Album</label>
                                <Input type='text' name='duration' id='duration' value={this.state.packages.duration}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="price">Price Of the package</label>
                                <Input type='text' name='price' id='price' value={this.state.packages.price}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="participants">Min no of participants</label>
                                <Input type='text' name='participants' id='participants' value={this.state.packages.participants}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="desc">desc</label>
                                <Input type='text' name='desc' id='desc' value={this.state.packages.desc}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight1">heighlight1</label>
                                <Input type='text' name='heighlight1' id='heighlight1' value={this.state.packages.heighlight1}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight2">heighlight2</label>
                                <Input type='text' name='heighlight2' id='heighlight2' value={this.state.packages.heighlight2}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="heighlight3">heighlight3</label>
                                <Input type='text' name='heighlight3' id='heighlight3' value={this.state.packages.heighlight3}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="transportation">transportation</label>
                                <Input type='text' name='transportation' id='transportation' value={this.state.packages.transportation}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="phone">phone</label>
                                <Input type='text' name='phone' id='phone' value={this.state.packages.phone}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="name">name</label>
                                <Input type='text' name='name' id='name' value={this.state.packages.name}
                                    onChange={this.handleChange} required />
                            </FormGroup>

                            <label>Please Select Image of your package</label>
                            <FormGroup>
                                <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3001/uploads/${this.state.packages.image}`}
                                    alt="Property Image" />
                                <CustomInput type='file' id='image'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Package updated Successfully. </Alert>
                            </FormGroup>
                            <Button color="primary" type="submit" onClick={this.updatePackage}>Update Package</Button>
                        </Form>

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
