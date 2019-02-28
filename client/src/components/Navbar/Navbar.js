import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import ExportPage from "../ExportPage/ExportPage";
import RegistryPage from "../RegistryPage/RegistryPage";
import SearchPage from "../SearchPage/SearchPage";
import AddItemPage from "../AddItemPage/AddItemPage";


import classes from "./Navbar.module.css";


const navbar = (props) => {
    // useState hook for the search result variable
    let [searchResult, setSearchResult] = useState(null);
    
    return (
            <Router>
              <div>
                  <nav className={classes.Navbar}>
                  <Link to="/" className={classes.Logo}>Contas / <span style={{ color: "#2EB946", fontSize: "1.2em" }}>2019</span></Link>
                      <ul>
                          <li>
                              <label>Dosier</label>
                              <input name="search" 
                                onChange={(e) => setSearchResult(e.target.value.toUpperCase()) } 
                                type="text" />
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
                  <Route path="/" exact component={() => <HomePage 
                                                            data={props.items}
                                                            months={props.months}/>} />
                  <Route path="/add" component={() => <AddItemPage />} />
                  <Route path="/items" component={() => <RegistryPage 
                                                            removeHandler={ props.removeHandler}
                                                            data={props.items}
                                                            months={props.months}
                                                             />}/>
                  <Route path="/export" component={() => <ExportPage />}/>
                  <Route path="/search" component={() => <SearchPage 
                                                            data={props.items}
                                                            search={searchResult}
                                                            removeHandler={ props.removeHandler}/>} />
              </div>
          </Router>
    );
};

export default navbar;