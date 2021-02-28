import React from 'react';
import { Link } from "react-router-dom";

class Navbar extends React.Component{

    // function logout
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand" href="#">Moklet Computer Store</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/product" className="nav-link">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customer" className="nav-link">Customers</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transaction" className="nav-link">Transactions</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">Administrator</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>Logout</Link>
                        </li>
                    </ul>
                    
                </div>
                {/* <span class="navbar-text">
                        test
                </span> */}
            </div>
        </nav>
        )
    }
}

export default Navbar;