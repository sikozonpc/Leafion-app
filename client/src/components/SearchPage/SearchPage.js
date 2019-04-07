import React from 'react';
import { Container } from "react-bootstrap";

import classes from "./SearchPage.module.css";

import ResultsTable from '../ResultsTable/ResultsTable';
import notFound from "../../assets/svg/undraw_empty_xct9.svg";



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
        <div >
            <h3 style={{
                textAlign: "center", color: "gray", 
                margin: "50px"}}>
            Results not found</h3>
            <img
                style={{display:"block",width:"35%",margin: "auto", marginBottom: "100px"}}
                        
                src={notFound}
                alt="Not found ilustration"
            />
        </div>
    );

    return (
        <Container style={{margin: "50px auto"}}>
            <h1 className={classes.h1} >
                    Searching for:
                    <span style={{"color":"green"}}> {props.search}</span> 
            </h1>
            { resultDisplay }
             
        </Container>
    );
};

export default searchPage;  