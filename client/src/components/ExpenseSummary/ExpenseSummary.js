import React from 'react';
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./ExpenseSummary.module.css"

const expenseSummary = (props) => {
    let lastDaysIncome = 0;
    let lastDaysExpense = 0;
    let lastTransactions = [];
    // Change the listLength to change the number or reports to show
    const listLenght = 5;

    // Sort from the most recent to the last
    props.data.reverse();

    for(let i=0; i < listLenght; i++) {
        lastTransactions.push( [ props.data[i].post.name, props.data[i].post.amount ] );

        if(props.data[i].post.amount >= 0) {
            lastDaysIncome += Number(props.data[i].post.amount);
        } else {
            lastDaysExpense += Number(props.data[i].post.amount);
        }
    }
    
    // Change the Alet message and color depending on the balance result
    //TODO: calcular segundo o mes ATUAL 
    const alert = (
        (lastDaysIncome + lastDaysExpense) >= 0 ? 
         <Alert className={classes.Alert} variant="success">Hello Tiago, looks like your financial status are good!</Alert> 
        :    <Alert className={classes.Alert} variant="danger">Hey Tiago, you have been spending more then what you've earned</Alert> 
    );
    
    return (
        <>
        { alert }
        <Row className={classes.HistoryBox} >
                    <Col xs lg="auto">
                        <p>Income</p>
                        <p>Expense</p>
                        { lastTransactions.map( (e,i) => {
                            if(i === 0) {
                                return <p key={e[0]} className={classes.Item} style={{ paddingTop: "10px" }}>
                                    { e[0] }...
                                 </p>
                            } 
                            else if(i === listLenght -1) {
                                return <p key={e[0]} className={classes.Item}  style={{ paddingBottom: "10px" }}>
                                    { e[0] }... 
                                 </p>
                            } else {
                                return <p key={e[0]} className={classes.Item}> { e[0] }... </p>
                            }
                        }) }
                        <p>Balance</p>
                    </Col>
                    <Col  xs lg="auto">
                        <p>+{lastDaysIncome} €</p>
                        <p>{lastDaysExpense} €</p>
                        { lastTransactions.map( (e,i) => {
                            if(i === 0) {
                                return <p key={e[0]} className={classes.Item} style={{ paddingTop: "10px" }}>
                                    { e[1] } €
                                 </p>
                            } 
                            else if(i === listLenght -1) {
                                return <p key={e[0]}  className={classes.Item}  style={{ paddingBottom: "10px" }}>
                                    { e[1] } €
                                 </p>
                            } else {
                                return <p key={e[0]} className={classes.Item}> { e[1] } € </p>
                            }
                        }) }
                        <p> {lastDaysIncome + lastDaysExpense} €</p>
                    </Col>
                    <Row  className={classes.Buttons}>
                        <Link className="btn btn-danger" to="/add/expense">+ Expense</Link>
                        <Link className="btn btn-success" to="/add/income">+ Income</Link>
                    </Row>
                </Row>
                </>
    );
};

export default expenseSummary;