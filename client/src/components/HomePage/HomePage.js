import React from 'react';
import MonthItem from "./MonthItem/MonthItem";

import classes from "./HomePage.module.css";

import { Container, Row, Col } from "react-bootstrap";


const homePage = (props) => {
    console.log("[HomePage.js] @render | props: " , props.data);


    return (
        <Container style={{background: "#f0f0f0"}}>
        <Row>
            {Object.keys(props.months).map(m => {
                return  <MonthItem 
                    key={m}
                    name={m}
                    totalRecebido={getMoneyFromMonth(props.data, props.months[m], "r")} 
                    totalGasto={getMoneyFromMonth(props.data, props.months[m], "g")} />
            })}
        </Row>
        </Container>
    );
};


// Auxaliary method to extract type of money transaction from a given month
const getMoneyFromMonth = (data, month, transactionType) =>{
    let totalGasto = 0;
    let totalRecebido = 0;

    if(transactionType === "r"){
        data.map(e => {
            if(e.post.mes === month){
                totalRecebido += Number(e.post.recebido);
            }
        })

        return totalRecebido;
    } else {
        data.map(e => {
            if(e.post.mes === month){
                totalGasto += Number(e.post.gasto);
            }
        })
        return totalGasto;
    }
}


export default homePage;