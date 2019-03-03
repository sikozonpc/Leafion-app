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
                    <Link to="/" className={classes.Logo}>Contas <span style={{ color: "#2EB946", fontSize: "1.4rem" }}>[Personal Budget]</span> <i style={{ fontSize: "1rem" }}>mode</i></Link>
                    <ul>
                        <li className={classes.SearchBox}>
                            <Link className={classes.Btn} to="Search"><i className="fas fa-search"></i></Link>
                            <input name="search" className={classes.SearchBar}
                                onChange={(e) => setSearchResult(e.target.value.toUpperCase())}
                                type="text" />
                        </li>
                        <li>
                            <Link to="/goals" className="btn">Goals</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="btn">Settings</Link>
                        </li>
                        <li>
                            <Link to="/items" className="btn">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/auth" className="btn inverted">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Route path="/" exact component={() => <HomePage
                    data={props.items}
                    months={props.months} />} />
                <Route path="/add" component={() => <AddItemPage />} />
                <Route path="/items" component={() => <RegistryPage
                    removeHandler={props.removeHandler}
                    data={props.items}
                    months={props.months}
                />} />
                <Route path="/export" component={() => <ExportPage />} />
                <Route path="/search" component={() => <SearchPage
                    data={props.items}
                    search={searchResult}
                    removeHandler={props.removeHandler} />} />
            </div>
        </Router>
    );
};

export default navbar;