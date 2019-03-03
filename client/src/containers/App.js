import React, { Component } from 'react';

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar"; 

import classes from "./App.module.css";

//TODO: https://reactjs.org/docs/context.html

//
// Container of the structure of the application and state.
//


class App extends Component {
  state = {
    items: {}
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

  // Responsible for removing an item from the db.
  removeHandler = (id) => {
    fetch('/items/remove', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id
        })
      })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)})
        
      window.location.reload();
}

  // Global onChangeHandler for state changes
  onChangeHandler = (event) =>{
    const [name, value] = event.target;
    this.setState( {[name]: value} );
  }

   // Convert items objects to an array to display
 objectToArray = (items) => {
    let result = []
    for (let e in items) {
        result.push( items[e] );
    }
    return result;
  }


  render() {
    console.log("[App.js] @render");
    // Because I am using router for the pages the Content section is dynamically added by it
    return (
      <div className={classes.App}>
        <Navbar
          onChange={() => this.onChangeHandler}
          items={this.objectToArray(this.state.items)}
          removeHandler={ this.removeHandler}
          months={MONTHS}/>
        <Footer />
      </div>
    );
  }
}

// Array containing alls months available for the map method
const MONTHS = {
  "January": "jan","February": "feb","March": "mar","April": "apr", "May":"mai",
  "June": "jun", "July": "jul", "August": "aug", "September": "sep",
  "October": "oct", "November": "nov", "December": "dec"
};


export default App;
