import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import ExportPage from "../ExportPage/ExportPage";
import ResultsTable from "../ResultsTable/ResultsTable";
import SearchPage from "../SearchPage/SearchPage";
import AddItemPage from "../AddItemPage/AddItemPage";


import classes from "./Navbar.module.css";


const navbar = (props) => {
    // useState hook for the search result variable
    let [searchResult, setSearchResult] = useState("");
    
    return (
            <Router>
              <div>
                  <nav className={classes.Navbar}>
                  <Link to="/" className={classes.Logo}>Contas / <span style={{ color: "#2EB946", fontSize: "1.2em" }}>2019</span></Link>
                      <ul>
                          <li>
                              <label>Dosier</label>
                              <input name="search" 
                                onChange={(e) => setSearchResult(e.target.value) } 
                                type="text" />
                              <Link className={classes.Btn} to="Search">Procurar</Link>
                          </li>
                          <li>
                              <Link to="/add" className={classes.Btn}>Adicionar novo</Link>
                          </li>
                          <li>
                              <Link to="/items" className={classes.Btn}>Ver Registro</Link>
                          </li>
                          <li>
                              <Link to="/export" className={classes.Btn}>Export Excel</Link>
                          </li>
                      </ul>
                  </nav>
                  <Route path="/" exact component={() => <HomePage data={props.calculateResult(props.items)}/>} />
                  <Route path="/add" component={() => <AddItemPage />} />
                  <Route path="/items" component={() => <ResultsTable />}/>
                  <Route path="/export" component={() => <ExportPage />}/>
                  <Route path="/search" component={() => <SearchPage  />} />
              </div>
          </Router>
    );
};

export default navbar;