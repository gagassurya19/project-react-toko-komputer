import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("customer")
        window.location = "/login"
    }
    render(){
        return(
            <div className="glass">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="#">Moklet Computer Store</a>
                        
                        {/* show and hide menu */}
                        <button className="navbar-toggler" data-toggle="collapse"
                        data-target="#menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="menu">
                            <ul class="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/transaction" className="nav-link">Transactions</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={() => this.Logout()}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;