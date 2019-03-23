import React from 'react';

import classes from "./SearchPage.module.css";

import ResultsTable from '../ResultsTable/ResultsTable';

import { Container } from "react-bootstrap";



const searchPage = (props) => {
    const regex = new RegExp(props.search, "gi");
   
    const result = props.data.filter(p =>{
        // If the search is empty then return null
        if( "/(?:)/gi".match(regex) ) {
            return null;
        } else {
            return p.post.category.match(regex) ||
            p.post.date.match(regex) || p.post.name.match(regex);
        }
    } );

    const resultDisplay = ( result.length  ? 
        <ResultsTable 
            data={result}
            removeHandler={ props.removeHandler}/> :
        <h3 style={{
            textAlign: "center", color: "gray", 
            margin: "100px"}}>
        Type something you would like to search for.</h3>
    );

    return (
        <Container stlyle={{paddingTop: "40px"}}>
            <h1 className={classes.h1} 
                style={{"color":"#333","marginLeft":"15px"}}>
                    Pesquisa por:
                    <span style={{"color":"green"}}> {props.search}</span> 
            </h1>
            { resultDisplay }
             
        </Container>
    );
};

export default searchPage;  