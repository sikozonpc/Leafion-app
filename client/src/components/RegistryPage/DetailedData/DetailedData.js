import React from 'react';

import classes from "./DetailedData.module.css"

import { Container,ListGroup } from "react-bootstrap";

//
// Component that displays and calculates the specific data to each month  
//
const detailedData = (props) => {
    // Calculations for the data display
    const numActions = props.data.length;
    const IVA = 0.23;
    let totalSpendings = 0;
    let totalEarned = 0;
    let totalEarnedIVA = 0;

   
    props.data.map(e => totalSpendings+= Number(e.post.gasto));
    props.data.map(e => totalEarned+= Number(e.post.recebido));
    totalEarnedIVA =  (totalEarned - (totalEarned * IVA)).toFixed(2);

    let total = (totalEarned - totalSpendings ).toFixed(2);

    let totalStyles = total > 0 ? successStyles : dangerStyles;
    if(total === 0){
        totalStyles = null;
    }

    return (
        <Container>
            <ListGroup >
                <ListGroup.Item>
                    <i className="far fa-bookmark"></i> Actions: <strong>{numActions}</strong>
                </ListGroup.Item>
       
                <ListGroup.Item >
                    <i className="fas fa-minus"></i> Total Spent: <strong>{totalSpendings} €</strong>
                </ListGroup.Item>
                <ListGroup.Item >
                    <i className="fas fa-plus"></i> Total Earned: <strong>{totalEarned} €</strong>
                    <p><i>+iva: ({totalEarnedIVA}) €</i></p>
                </ListGroup.Item>
                <ListGroup.Item  variant={totalStyles}>
                    Total: <strong>{totalEarned} - {totalSpendings} = {total} €</strong>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
};


const successStyles = "success";
const dangerStyles = "danger";


export default detailedData;