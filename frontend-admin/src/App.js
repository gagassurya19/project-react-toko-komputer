import React from "react"
import { Switch, Route } from "react-router-dom";
import './App.css';

// Import pages
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import Customer from "./Pages/Customer"
import Transaction from "./Pages/Transaction"
import Home from "./Pages/Home"
import Admin from "./Pages/Admin"

class App extends React.Component{

    componentDidMount() {
        document.body.classList.add("backg");
    }

  render(){
    return(
        <div>
            <div className="watermark">
                Admin Frontend <br/>
                <a href="https://github.com/gagassurya19/project-react-toko-komputer">./branch Main</a>
            </div>
            <div className="container mt-5">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/product" component={Product} />
                    <Route path="/customer" component={Customer} />
                    <Route path="/transaction" component={Transaction} />
                    <Route path="/admin" component={Admin} />
                </Switch>
            </div>
        </div>
    )
  }
}

export default App;