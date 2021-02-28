import React from "react";

class ProductList extends React.Component{
    render(){
        return (
            <div class="card col-3">
                <img src={this.props.image} class="card-img-top" alt={this.props.name}/>
                <div class="card-body">
                    <h5 class="card-title">{this.props.name}</h5>
                    <h6 className="text-danger">
                        Price : { this.props.price}
                    </h6>
                    <h6 className="text-dark">
                        Stock : { this.props.stock}
                    </h6>
                </div>
                <div className="card-footer">
                <button type="button" class="btn btn-primary m-1" onClick={this.props.onEdit}>Edit</button>
                    <button type="button" class="btn btn-danger m-1" onClick={this.props.onDrop}>Delete</button>
                </div>
            </div>
        )
    }
}

export default ProductList;