import React from 'react';

import classes from "./SearchPage.module.css";

import ResultsTable from '../ResultsTable/ResultsTable';


const searchPage = (props) => {
    const result = props.data.filter(p => p.post.dosier === props.search);
    console.log("sr: " , result);
    return (
        <div className={classes.SearchResult}>
            <h1 className={classes.h1} 
                style={{"color":"white","marginLeft":"15px"}}>
                    Pesquisa por:
                    <span style={{"color":"#222"}}> {props.search}</span> 
            </h1>
            <ResultsTable 
                data={result}
                removeHandler={ props.removeHandler}/>  
        </div>
    );
};

export default searchPage;  