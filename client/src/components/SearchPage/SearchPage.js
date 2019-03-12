import React from 'react';

import classes from "./SearchPage.module.css";

import ResultsTable from '../ResultsTable/ResultsTable';

import { Container } from "react-bootstrap";



const searchPage = (props) => {
    const result = props.data.filter(p => p.post.dosier === props.search);
    console.log("sr: " , result);
    return (
        <Container stlyle={{paddingTop: "40px"}}>
            <h1 className={classes.h1} 
                style={{"color":"#333","marginLeft":"15px"}}>
                    Pesquisa por:
                    <span style={{"color":"green"}}> {props.search}</span> 
            </h1>
            <ResultsTable 
                data={result}
                removeHandler={ props.removeHandler}/>  
        </Container>
    );
};

export default searchPage;  