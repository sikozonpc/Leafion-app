import React from 'react';
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./ExpenseSummary.module.css"

import userImg from "../../assets/eu.jpg";

const expenseSummary = (props) => {
    let currMonthIncome = 0;
    let currMonthExpenses = 0;
    let lastTransactions = [];

    let currMonthBalance = 0;
    // Since JS getMonth() returns the index of the month I use the months object to get the
    // month formated for my calculations
    const currMonth = Object.values(props.months)[ new Date().getMonth() ];
    // Display format is the "pretty" version of the month name
    const currMonthDisplayFormat = Object.keys(props.months)[ new Date().getMonth() ];
    // Change the listLength to change the number or reports to show
    const listLenght = 5;


    for(let i=0; i < props.data.length; i++) {

        if(props.data[i].post.amount >= 0 && props.data[i].post.month === currMonth) {
            currMonthIncome += Number(props.data[i].post.amount);
        } if(props.data[i].post.amount < 0 && props.data[i].post.month === currMonth) {
            currMonthExpenses += Number(props.data[i].post.amount);
        }
    }

    // List with the name and amount of the recent activites from the curr month for displaying.
    for(let i=1; i <= listLenght +1; i++){
        let indexReversed = props.data.length - i;
        if(props.data[indexReversed].post.month === currMonth) {
            lastTransactions.push( [ props.data[indexReversed].post.name, props.data[indexReversed].post.amount ] );
        }
       
    }

    // Set current month balance
    props.data.map(e => {
        if(currMonth === e.post.month  ) {
            return currMonthBalance += Number(e.post.amount) 
        }
    });
    console.log(currMonthBalance)

    // Change the Alert message and color depending on the balance result
    const alert = (
        (currMonthBalance) >= 0 ? 
         <Alert className={classes.Alert} variant="success">Hello Tiago, looks like your financial status are good for <span style={{color: "#222"}}>{currMonthDisplayFormat}</span> !</Alert> 
        :    <Alert className={classes.Alert} variant="danger">Hey Tiago, you have been spending more then what you've earned so far in <span style={{color: "#222"}}>{currMonthDisplayFormat}</span> !</Alert> 
    );

    const COLOR = (currMonthBalance >= 0 ? "rgb(22, 240, 69)" : "red");
    
    return (
        <>
        { alert }
        <div className={classes.Wrapper}>
            <div>
                <img src={userImg} alt="user"  className={classes.UserImg}></img>
                <p className={classes.UserName}>Tiago Taquelim</p>
            </div>
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
                <p style={{color: "rgb(22, 240, 69)" }}>+{currMonthIncome} €</p>
                <p style={{color: "red" }}>{currMonthExpenses} €</p>
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
                <p style={{color: COLOR }}> {currMonthBalance} €</p>
            </Col>
            <Row  className={classes.Buttons}>
                <Link className="btn btn-danger" to="/add/expense">+ Expense</Link>
                <Link className="btn btn-success" to="/add/income">+ Income</Link>
            </Row>
        </Row>
        </div>
        </>
    );
};


export default expenseSummary;