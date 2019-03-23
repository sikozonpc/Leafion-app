import React, { Component } from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Spinner from "../components/UI/Spinner/Spinner";

import Layout from "./Layout/Layout";
import RouterContent from "../components/RouterContent/RouterContent";


//TODO: https://reactjs.org/docs/context.html

//
// Container of the structure of the application and state.
//


class App extends Component {
  state = {
    items: null,
    searchResult: "",
    loading: true
  };

  // Api call to the API Server to get the database
  componentDidMount(){
    console.log("[App.js] @componentDidMount")
    fetch('/items/all')
      .then(res => res.json() )
      .then(db => { 
          console.log("[App.js] @componentDidMount | db: " , db); 
          this.setState( { items: db, loading: false } )
        });
  }

  setSearchResult = (string) => {
    this.setState( { searchResult: string.toUpperCase()} );
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
    let routerContent = this.state.items  ?
       <RouterContent 
          items={this.state.items} 
          removeHandler={this.removeHandler}
          months={MONTHS}
          searchResult={this.state.searchResult}
        /> 
       : <Spinner />;

    return (
      <Router>
        <Layout setSearchResult={this.setSearchResult}>
          {routerContent}
        </Layout>
      </Router>
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
