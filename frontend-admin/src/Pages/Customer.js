import React from "react";
import Navbar from "../Components/Navbar";

import CustomerList from "../Components/CustomerList";
import { base_url, customer_image_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"

class Customer extends React.Component{
    
    constructor(){
        super()
        this.state = {
            customers: [],
            token: "",
            action: "",
            name: "",
            phone: "",
            address: "",
            image: "",
            username: "",
            password: "",
            uploadFile: true,
            fillPassword: true,
            customer_id: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        // this.headerConfig.bind(this)
    }

    getCustomers = () => {
        let url = base_url + "/customer"
        axios.get(url, {headers:{ 
            Authorization: "Bearer " + this.state.token
        }})
        .then(response => {
            this.setState({customers: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    Add = () => {
        $("#modal_customer").modal("show")
        this.setState({
            action: "insert",
            customer_id: 0,
            name: "",
            address: "",
            phone: "",
            image: null,
            username: "",
            password: "",
            fillPassword: true,
            uploadFile: true
        })
    }

    Edit = selectedItem => {
        $("#modal_customer").modal("show")
        this.setState({
            action: "update",
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            uploadFile: false,
            fillPassword: false,
        })
    }

    saveCustomer = event => {
        event.preventDefault()
        $("#modal_customer").modal("hide")
        let form = new FormData()
        form.append("customer_id", this.state.customer_id)
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("username", this.state.username)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }
        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }
        let url = base_url + "/customer"
        if (this.state.action === "insert") {
            axios.post(url, form, {headers:{ 
            Authorization: "Bearer " + this.state.token
        }})
            .then(response => {
                // window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, {headers:{ 
            // Authorization: "Bearer " + this.state.token
        }})
            .then(response => {
                // window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }
    
    dropCustomer = selectedItem => {
        if (window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/customer/" + selectedItem.customer_id
            axios.delete(url, {headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                window.alert(response.data.message)
                this.getCustomers()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getCustomers()
    }
    
    render(){
        return(
        <div>
            <Navbar />
            <div className="container">
                <h3 className="text-bold text-info mt-2">Customer List</h3>
                <div className="row">
                    { this.state.customers.map( item => (
                        <CustomerList
                            key = {item.customer_id}
                            name = {item.name}
                            phone = {item.phone}
                            address = {item.address}
                            image = { customer_image_url + "/" + item.image}
                            onEdit = {() => this.Edit(item)}
                            onDrop = {() => this.dropCustomer(item)}
                        />
                    ))}
                </div>
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Add customer
                </button>
            </div>

            {/* modal customer 1 */}
            <div class="modal fade" id="modal_customer" tabindex="-1" aria-labelledby="modal_customerLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal_customerLabel">Form customer</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={ev => this.saveCustomer(ev)}>
                            <div class="modal-body">
                                
                                Customer Name
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Name" 
                                    value={this.state.name}
                                    onChange={ev => this.setState({name: ev.target.value})}
                                    required/>
                                </div>
                                
                                Customer Phone
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="Phone" 
                                    value={this.state.phone}
                                    onChange={ev => this.setState({phone: ev.target.value})}
                                    required/>
                                </div>
                                
                                Customer Address
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Add</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Address" 
                                    value={this.state.address}
                                    onChange={ev => this.setState({address: ev.target.value})}
                                    required/>
                                </div>

                                Username
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">@</span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Address" 
                                    value={this.state.username}
                                    onChange={ev => this.setState({username: ev.target.value})}
                                    required/>
                                </div>
                                
                                {/* image */}
                                { this.state.action === "update" && this.state.uploadFile === false ? (
                                    <button type="button" class="btn btn-secondary"
                                        onClick={() => this.setState({uploadFile: true})}>
                                        Change Customer image
                                    </button>
                                ) : (
                                    <div>
                                        Customer image 
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Upload</span>
                                            </div>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" 
                                                    onChange={ev => this.setState({image: ev.target.files[0]})} 
                                                    required
                                                />
                                                <label class="custom-file-label">Choose File</label>
                                            </div>
                                        </div>
                                    </div>
                                ) }
                                { this.state.action === "update" && this.state.fillPassword === false ? (
                                    <button type="button" class="btn btn-secondary m-2"
                                        onClick={() => this.setState({fillPassword: true})}>
                                        Change Password
                                    </button>
                                ) : (
                                    <div>
                                        Password
                                        <input type="password" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Customer;