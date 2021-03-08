import React from "react";
import Navbar from "../Components/Navbar";

import axios from "axios"
import { base_url } from "../Config"
import $ from "jquery"

class Admin extends React.Component {

    constructor() {
        super()
        this.state = {
            token: "",
            action: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            fillPassword: true
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.setState({ admins: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    Add = () => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "insert",
            admin_id: 0,
            name: "",
            username: "",
            password: "",
            fillPassword: true,
        })
    }

    Edit = selectedItem => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "update",
            admin_id: selectedItem.admin_id,
            name: selectedItem.name,
            username: selectedItem.username,
            password: "",
            fillPassword: false,
        })
    }

    saveAdmin = event => {
        event.preventDefault()
        $("#modal_admin").modal("hide")
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username
        }
        if (this.state.fillPassword) {
            form.password = this.state.password
        }
        let url = base_url + "/admin"
        if (this.state.action === "insert") {
            axios.post(url, form, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmins()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }
    }

    dropAdmin = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/admin/" + selectedItem.admin_id
            axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount() {
        this.getAdmins()
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container glass mt-3 p-5">
                    <h3 className="text-bold text-info mt-2">Admin List</h3>
                    <table class="card1 table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button type="button" className="btn btn-secondary m-1" onClick={() => this.Edit(item)}>
                                            <strong>Edit</strong>
                                        </button>
                                        <button type="button" className="btn btn-danger m-1" onClick={() => this.dropAdmin(item)}>
                                            <strong>Hapus</strong>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success m-1" onClick={() => this.Add()}>
                        <strong>Add Admin</strong>
                    </button>

                    {/* modal admin */}
                    <div class="modal fade" id="modal_admin" data-backdrop="false">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modal_adminLabel">Form Admin</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={ev => this.saveAdmin(ev)}>
                                    <div class="modal-body">
                                        
                                        Admin Name
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Name" 
                                            value={this.state.name}
                                            onChange={ev => this.setState({name: ev.target.value})}
                                            required/>
                                        </div>
                                        
                                        Username
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Username" 
                                            value={this.state.username}
                                            onChange={ev => this.setState({username: ev.target.value})}
                                            required/>
                                        </div>
                                        
                                        {/* password */}
                                        { this.state.action === "update" && this.state.fillPassword=== false ? (
                                            <button type="button" class="btn btn-secondary"
                                                onClick={() => this.setState({ fillPassword: true })}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <div class="input-group mb-3">
                                                    <input type="password" class="form-control" placeholder="Password" 
                                                    value={this.state.password}
                                                    onChange={ev => this.setState({password: ev.target.value})}
                                                    required/>
                                                </div>
                                            </div>
                                        ) }
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
            </div>
        )
    }
}

export default Admin;