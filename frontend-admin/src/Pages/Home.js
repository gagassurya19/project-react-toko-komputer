import React from "react";
import Navbar from "../Components/Navbar";

import axios from "axios";
import { base_url } from "../Config.js";

class Home extends React.Component{

    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            productsCount: 0,
            customersCount: 0,
            transactionsCount: 0,
            adminsCount: 0
        }
        // dapetin token dari localstorage
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            // token ga ada redirect ke laman login
            window.location = "/login"
        }
    }

    // sebagai request API untuk akses data product, admin, costumer 
    // Tidak bisa return object => [object object]
    // headerConfig() {
    //     let header = {
    //         headers: {
    //             Authorization: "Bearer " + this.state.token 
    //         }
    //     }
    //     return header;
    // }

    // update state productsCount
    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, {headers: {
            Authorization: "Bearer " + this.state.token 
        }})
        .then(response => {
            this.setState({ productsCount: response.data.length })
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

    // update state customersCount
    getCustomer = () => {
        let url = base_url + "/customer"
        axios.get(url, {headers: {
            Authorization: "Bearer " + this.state.token 
        }})
        .then(response => {
            this.setState({customersCount: response.data.length})
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

    // update state transactionsCount
    getTransactions = () => {
        let url = base_url + "/transaksi"
        axios.get(url, {headers: {
            Authorization: "Bearer " + this.state.token 
        }})
        .then(response => {
            this.setState({transactionsCount: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message + " getTransactions ")
                    this.props.history.push("/login")
                    localStorage.removeItem("token")
                    localStorage.removeItem("admin")
                }
            }else{
                console.log(error);
            }
        })
    }
    
    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, {headers: {
            Authorization: "Bearer " + this.state.token 
        }})
        .then(response => {
            this.setState({ adminsCount: response.data.length })
        })
        .catch(error => {
            if(error.response){
                if(error.response.status){
                    window.alert(error.response.data.message + " getAdmins")
                    this.props.history.push("/login")
                }
            }else{
                console.log(error)
            }

        })
    }

    // update state adminName
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
    }

    // jalanin semua function sebelum halaman terload
    componentDidMount(){
        this.getProduct()
        this.getCustomer()
        this.getTransactions()
        this.getAdmin()
        this.getAdmins()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-4">
                    <div class="alert alert-info" role="alert">
                        <strong>Welcome back, </strong> {this.state.adminName}
                    </div>
                    <div className="row">
                        <div class="col-12 col-lg card text-white bg-danger m-1" style={{ width: '18rem'}}>
                            <div class="card-body text-center">
                                <h5 class="card-text"><strong>ADMIN</strong></h5>
                                <h1 class="card-text"><strong>{this.state.adminsCount}</strong></h1>
                            </div>
                        </div>

                        <div class="col-12 col-lg card text-white bg-warning m-1" style={{ width: '18rem'}}>
                            <div class="card-body text-center">
                                <h5 class="card-text"><strong>CUSTOMER</strong></h5>
                                <h1 class="card-text"><strong>{this.state.customersCount}</strong></h1>
                            </div>
                        </div>

                        <div class="col-12 col-lg card text-white bg-success m-1" style={{ width: '18rem'}}>
                            <div class="card-body text-center">
                                <h5 class="card-text"><strong>PRODUCT</strong></h5>
                                <h1 class="card-text"><strong>{this.state.productsCount}</strong></h1>
                            </div>
                        </div>

                        <div class="col-12 col-lg card text-white bg-primary m-1" style={{ width: '18rem'}}>
                            <div class="card-body text-center">
                                <h5 class="card-text"><strong>TRANSACTION</strong></h5>
                                <h1 class="card-text"><strong>{this.state.transactionsCount}</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;