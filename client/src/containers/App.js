import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePage from "../components/HomePage/HomePage";
import ExportPage from "../components/ExportPage/ExportPage";
import ResultsTable from "../components/ResultsTable/ResultsTable";
import SearchPage from "../components/SearchPage/SearchPage";
import AddItemPage from "../components/AddItemPage/AddItemPage";
import Footer from "../components/Footer/Footer";

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

  HomePageComponent = () => {
    return (
        <HomePage data={this.calculateResult(this.state.items)}/>
    );
  };

 AddItemComponent = () => {
    return(
            <AddItemPage />
    );
  };

 ResultsTableComponent = () => {
    return(
            <ResultsTable />
    );
  };

 SearchPageComponent = () => {
    return(
            <SearchPage />
    );
  };

 ExportPageComponent = () => {
    return(
            <ExportPage />
    );
  };


  render() {
    console.log("[App.js] @render");
    return (
      <div className={classes.App}>
        <Button variant="contained" color="primary">
        Hello World
      </Button>
          {/* NAVBAR  */}
            <Router>
              <div>
                  <nav className={classes.Navbar}>
                  <Link to="/" className="logo">Contas / <span style={{ color: "#2EB946", fontSize: "1.2em" }}>2019</span></Link>
                      <ul>
                          <li>
                              <label>Dosier</label>
                              <input name="search" onChange={this.onChange} type="text" />
                              <Link className="btn" to="Search">Procurar</Link>
                          </li>
                          <li>
                              <Link to="/add" className="btn">Adicionar novo</Link>
                          </li>
                          <li>
                              <Link to="/items" className="btn">Ver Registro</Link>
                          </li>
                          <li>
                              <Link to="/export" className="btn inverted">Export Excel</Link>
                          </li>
                      </ul>
                  </nav>
                  <Route path="/" exact component={this.HomePageComponent} />
                  <Route path="/add" component={this.AddItemComponent} />
                  <Route path="/items" component={this.ResultsTableComponent}/>
                  <Route path="/export" component={this.ExportPageComponent}/>
                  <Route path="/search" component={this.SearchPageComponent} />
              </div>
          </Router>

          <Footer />
      </div>
    );
  }
}




export default App;
