import React, { Component } from 'react';

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar"; 

import classes from "./App.module.css";


//
// Container of the structure of the application and state.
//
class App extends Component {
  state = {
    items: {},
    search: "",
    monthsCounter: 0
  };

  // Api call to the API Server to get the database
  componentDidMount(){
    console.log("[App.js] @componentDidMount")
    fetch('/items/all')
      .then(res => {
          console.log("[App.js] @componentDidMount | response:" , res);
          return res.json()
        })
      .then(db => { 
          console.log("[App.js] @componentDidMount | db: " , db); 
          this.setState( { items: db} )
        });
  }

  // Global onChangeHandler for state changes
  onChangeHandler = (event) =>{
    const [name, value] = event.target;
    this.setState( {[name]: value} );
  }

   // Convert items objects to an array to display
 calculateResult = (items) => {
    let result = []
    for (let e in items) {
        result.push( items[e] );
    }
    return result;
  }


  render() {
    console.log("[App.js] @render");
    // Because I am using router for the pages the Content is dynamically added by it
    return (
      <div className={classes.App}>
          <Navbar
            onChange={() => this.onChangeHandler}
            calculateResult={this.calculateResult}
            items={this.state.items}/>
          <Footer />
      </div>
    );
  }
}


export default App;
