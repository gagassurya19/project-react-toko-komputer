import React from "react";
import axios from "axios"
import { base_url } from "../Config.js";


export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/customer/auth"
        

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let customer = response.data.data
                let token = response.data.token
                localStorage.setItem("customer", JSON.stringify(customer))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div class="center container glass" style={{ width: '18rem' }}>
                <div class="card-body">
                    <h4 className="">Computer Store</h4>
                    <strong>Customer Sign In</strong>
                    { !this.state.logged ? (
                        <div className="alert alert-danger mt-1 text-danger">
                        { this.state.message }
                        </div>
                    ) : null }

                    <form onSubmit= { ev => this.Login(ev) } >
                        <div className="row">
                            <div className="col-12">
                                <input type="text" class="form-control mb-3" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"
                                value={ this.state.username } onChange={ ev => this.setState({ username: ev.target.value }) }/>
                    
                                <input type="password" class="form-control mb-3" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping"
                                value={ this.state.password } onChange={ ev => this.setState({ password: ev.target.value }) } autoComplete="false"/>
                            
                                <button type="submit" class="btn btn-info form-control mb-3">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
