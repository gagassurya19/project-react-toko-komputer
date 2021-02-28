import React from "react";

class TransactionList extends React.Component {
    getAmount = products => {
        let total = 0
        products.map(it => {
            total += Number(it.price) * Number(it.qty)
        })
        return total
    }

    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    render() {
        return (
            <div>
                {/* list */}
                <div className="card">
                    <div className="card-body row">
                        <div className="col">
                            <small className="text-info">Customer</small>
                            <h6>{this.props.customer_name}</h6>
                        </div>
                        <div className="col">
                            <small className="text-info">Address</small>
                            <h6>{this.props.customer_address}</h6>
                        </div>
                        <div className="col">
                            <small className="text-info">Total Amount</small>
                            <h6 className="text-danger">Rp {this.getAmount(this.props.products)}</h6>
                        </div>
                        <div className="col">
                            <small className="text-bold text-info">
                                Time: {this.convertTime(this.props.time)}
                            </small>
                            <button type="button" className="btn btn-success form-control mt-2 mb-2" data-toggle="modal" 
                                data-target={`#modalDetail${this.props.transaction_id}`}>
                                <strong>Details</strong>
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal transaction */}
                <div class="modal fade" id={`modalDetail${this.props.transaction_id}`} tabindex="-1" aria-labelledby="modal_transactionLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modal_transactionLabel">Detail of Transaction</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h5>Customer:{this.props.customer_name}</h5>
                                <h6>Time:{this.convertTime(this.props.time)}</h6>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.products.map((item, index) => (
                                            <tr key={item.product_id}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.product.name}</td>
                                                <td>Rp {item.price}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">Rp {item.price * item.qty}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold">
                                                <h4>Total</h4>
                                            </td>
                                            <td className="text-right text-danger text-bold">
                                                <h4>
                                                    Rp {this.getAmount(this.props.products)}
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionList;