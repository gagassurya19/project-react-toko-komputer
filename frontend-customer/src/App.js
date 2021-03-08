import React from "react"
import './App.css';

import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import Transaction from "./Pages/Transaction"
import Cart from "./Pages/Cart"

export default class App extends React.Component{
  render(){
    return(
      <div>
        <div className="watermark">
          Customer Frontend <br/>
          <a href="https://github.com/gagassurya19/project-react-toko-komputer">./branch Main</a>
        </div>
        <div className="container mt-4">
          <Switch>
            <Route exact path="/" component={Product} />
            <Route path="/login" component={Login} />
            <Route path="/transaction" component={Transaction} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </div>
      </div>
      
    )
  }
}
