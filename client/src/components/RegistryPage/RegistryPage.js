import React, {useState} from 'react';
import { Link } from "react-router-dom";


import ResultsTable from "../ResultsTable/ResultsTable";
import DetailedData from "./DetailedData/DetailedData";

import classes from "./RegistryPage.module.css";

const registryPage = (props) => {
    const [filter, setFilter] = useState(null);
    // if its null display all data, ignore the filter then
    let currentData;
    if(!filter){
        currentData =  props.data;
    } else {
        currentData = props.data.filter(e => e.post.mes === filter);
    }

   
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Dashboard}>
                <h3>Dashboard</h3>
                <h2><i className="fas fa-wrench"></i> MANAGE</h2>
                <Link to="/add"><i className="fas fa-plus"></i> Add</Link>
                <Link to="/Search"><i className="fas fa-search"></i> Search</Link>
                <a href="#"><i className="fas fa-sort-alpha-down"></i> Sort</a>
                <h2><i className="far fa-compass"></i> DATA</h2>
                <Link to="/export"><i className="far fa-file-excel"></i> Export to Excel</Link>
                <a href="#"><i className="fas fa-database"></i> Json</a>
   
            </div>
            <div className={classes.DataTable}>
                <div className={classes.Controls}>
                    <h3><i className="fas fa-filter"></i> Filter: </h3>
                    <button onClick={() => setFilter(null)} 
                            className={classes.firstElem}>ALL</button>

                    {Object.keys(props.months).map(m => {
                        return <button key={m}
                                    onClick={() => setFilter(props.months[m])}>
                                    {props.months[m].toUpperCase()}
                                </button>
                    })}
                </div>
                <div className={classes.Grid}>
                    <div className={classes.Table}>
                        <ResultsTable  
                            removeHandler={ props.removeHandler}
                            data={currentData}/> 
                    </div>
                    <DetailedData data={currentData} />
                </div>
            </div>
        </div>
    );
};

export default registryPage;