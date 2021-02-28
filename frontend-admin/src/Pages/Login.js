import React from "react";
import axios from "axios";
import { base_url } from "../Config.js";

class Login extends React.Component{

    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }
        
    Login = event => {

        event.preventDefault()

        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/admin/auth"

        axios.post(url, sendData)
        .then(response => {
            this.setState({
                logged: response.data.logged
            })

            if(this.state.logged){
                let admin = response.data.data
                let token = response.data.token
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({
                    message: response.data.message
                })
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="row">
                <div class="card container col-12 col-sm-4 p-0 mt-5 border-success" style={{ width: '18rem' }}>
                    <div class="card-header text-white bg-success">
                        <div className="row">
                            <h4 className="col-6">Computer Store</h4>
                            <strong className="text-warning col-4 ml-auto">Admin Sign In</strong>
                        </div>  
                    </div>
                    <div class="card-body">
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
                                
                                    <button type="submit" class="btn btn-outline-success form-control mb-3">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;