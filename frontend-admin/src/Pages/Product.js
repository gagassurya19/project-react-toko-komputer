import React from "react";
import Navbar from "../Components/Navbar";

import ProductList from "../Components/ProductList"
import { base_url, product_image_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"

class Product extends React.Component{
    
    constructor(){
        super()
        this.state = {
            products: [],
            token: "",
            action: "",
            name: "",
            price: 0,
            stock: 0,
            image: "",
            uploadFile: true,
            product_id: "",

        }
        
        if (localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        } else{
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, {headers:{ 
            Authorization: "Bearer " + this.state.token
        }})
        .then(response => {
            this.setState({products: response.data})
        })
        .catch(error => {
            if (error.response){
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            } else{
                console.log(error);
            }
        })
    }
    
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            product_id: 0,
            name: "",
            price: 0,
            stock: 0,
            image: null,
            uploadFile: true
        })
    }
    
    Edit = selectedItem => {
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            product_id: selectedItem.product_id,
            name: selectedItem.name,
            price: selectedItem.price,
            stock: selectedItem.stock,
            image: null,
            uploadFile: false
        })
    }
    
    saveProduct = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let form = new FormData()
        form.append("product_id", this.state.product_id)
        form.append("name", this.state.name)
        form.append("price", this.state.price)
        form.append("stock", this.state.stock)
        
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/product"
        if (this.state.action === "insert") {
            axios.post(url, form, {headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                // window.alert(response.data.message)
                this.getProduct()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, {headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                // window.alert(response.data.message)
                this.getProduct()
            })
            .catch(error => console.log(error))
        }
    }
    
    dropProduct = selectedItem => {
        if (window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/product/" + selectedItem.product_id
            axios.delete(url, {headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                // window.alert(response.data.message)
                this.getProduct()
            })
            .catch(error => console.log(error))
        }
    }
    
    componentDidMount(){
        this.getProduct()
    }
    
    render(){
        return(
        <div>
            <Navbar />
            <div className="container">
                <h3 className="text-bold text-info">Product List</h3>
                <button type="button" className="btn btn-success mt-2 mb-2" onClick={() => this.Add()}>
                    Add Product
                </button>
                <div className="row">
                    { this.state.products.map( item => (
                        <ProductList
                            key = {item.product_id}
                            name = {item.name}
                            price = {item.price}
                            stock = {item.stock}
                            image = { product_image_url + "/" + item.image}
                            onEdit = {() => this.Edit(item)}
                            onDrop = {() => this.dropProduct(item)}
                        />
                    ))}
                </div>
            </div>

            {/* modal product*/}
            <div class="modal fade" id="modal_product" tabindex="-1" aria-labelledby="modal_productLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal_productLabel">Form Product</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={ev => this.saveProduct(ev)}>
                            <div class="modal-body">
                                
                                Product Name
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Name" 
                                    value={this.state.name}
                                    onChange={ev => this.setState({name: ev.target.value})}
                                    required/>
                                </div>
                                
                                Product Stock
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" placeholder="Stock" 
                                    value={this.state.stock}
                                    onChange={ev => this.setState({stock: ev.target.value})}
                                    required/>
                                </div>
                                
                                Product Price
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Rp.</span>
                                    </div>
                                    <input type="number" class="form-control" placeholder="Price" 
                                    value={this.state.price}
                                    onChange={ev => this.setState({price: ev.target.value})}
                                    required/>
                                </div>
                                
                                {/* image */}
                                { this.state.action === "update" && this.state.uploadFile === false ? (
                                    <button type="button" class="btn btn-secondary"onClick={() => this.setState({uploadFile: true})}>
                                        Change Product image
                                    </button>
                                ) : (
                                    <div>
                                        Product image 
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Upload</span>
                                            </div>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" 
                                                onChange={ev => this.setState({image: ev.target.files[0]})} required/>
                                                <label class="custom-file-label">Choose File</label>
                                            </div>
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
        )
    }
}

export default Product;