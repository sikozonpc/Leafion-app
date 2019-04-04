import React from 'react';
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,Bar,BarChart
    ,Legend,Tooltip,CartesianGrid,YAxis,XAxis,Line,LineChart, ResponsiveContainer
  } from 'recharts';

import classes from "./HomePage.module.css";

import ExpenseSummary from "../../components/ExpenseSummary/ExpenseSummary";



const homePage = (props) => {
    console.log("[HomePage.js] @render | props: " , props);

    const recebidoGraphFormatedData = {};
    const gastoGraphFormatedData = {};

    //TODO: Add another line in the graph for the expected 
    Object.keys(props.months).map( m => {
        return gastoGraphFormatedData[ m.slice(0,3) ] = getMoneyFromMonth(props.data, props.months[m], "g");
    });
    Object.keys(props.months).map( m => {
        return recebidoGraphFormatedData[ m.slice(0,3) ] = getMoneyFromMonth(props.data, props.months[m], "r");
    });

    const graphData = [
        { Month: "Jan", Income: recebidoGraphFormatedData["Jan"], Expense: gastoGraphFormatedData["Jan"] },
        { Month: "Feb", Income: recebidoGraphFormatedData["Feb"], Expense: gastoGraphFormatedData["Feb"] },
        { Month: "Mar", Income: recebidoGraphFormatedData["Mar"], Expense: gastoGraphFormatedData["Mar"] },
        { Month: "Apr", Income: recebidoGraphFormatedData["Apr"], Expense: gastoGraphFormatedData["Apr"] },
        { Month: "May", Income: recebidoGraphFormatedData["May"], Expense: gastoGraphFormatedData["May"] },
        { Month: "Jun", Income: recebidoGraphFormatedData["Jun"], Expense: gastoGraphFormatedData["Jun"] },
        { Month: "Jul", Income: recebidoGraphFormatedData["Jul"], Expense: gastoGraphFormatedData["Jul"] },
        { Month: "Aug", Income: recebidoGraphFormatedData["Aug"], Expense: gastoGraphFormatedData["Aug"] },
        { Month: "Sep", Income: recebidoGraphFormatedData["Sep"], Expense: gastoGraphFormatedData["Sep"] },
        { Month: "Oct", Income: recebidoGraphFormatedData["Oct"], Expense: gastoGraphFormatedData["Oct"] },
        { Month: "Nov", Income: recebidoGraphFormatedData["Nov"], Expense: gastoGraphFormatedData["Nov"] },
        { Month: "Dec", Income: recebidoGraphFormatedData["Dec"], Expense: gastoGraphFormatedData["Dec"] }
        ];

    return (
        <Container fluid style={{backgroundColor:  "#F9F9F9"}}>
            <Row className={classes.MainStatus} >
                <ExpenseSummary data={props.data} months={props.months} />
            </Row>
            <Row className={classes.Graphs}>
                <div className={classes.StatsWrapper}>
                    <div className={classes.ContainerWrapper} style={{maxWidth: "800px", width: "100%" }}>
                        <h2>Year Overview</h2>
                        <ResponsiveContainer width="100%" height={400} >
                            <LineChart data={graphData}>
                                <XAxis dataKey="Month" />
                                <YAxis />
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="Expense" stroke="#e83c3c" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={classes.SingletionList}>
                        <div  className={classes.Singleton}>
                            <h3>Total Income</h3>
                            <p> + {getMoneyFromMonth(props.data, "all", "r")} €</p>
                        </div>
                        <div  className={classes.SingletonRed}>
                            <h3>Total Expenses</h3>
                            <p> - {getMoneyFromMonth(props.data, "all", "g")} €</p>
                        </div>
                    </div>
                </div>
                <div className={classes.DoubleChart}>
                    <div className={classes.ContainerWrapper} style={{maxWidth: "800px", width: "100%" }}>
                        <h2>Bar Chart </h2>
                        <ResponsiveContainer width="100%" height={400}>
                        <BarChart width={730} height={250} data={graphData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#82ca9d" />
                            <Bar dataKey="Expense" fill="#e83c3c" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={classes.ContainerWrapper} style={{maxWidth: "330px", width: "100%" }}>
                        <h2>Spending Activity </h2>
                        <ResponsiveContainer width="100%" height={400}>
                        <RadarChart outerRadius={90} width={330} height={350} data={graphData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} />
                            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Legend />
                        </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
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
            if( e.post.month === month && e.post.amount >= 0 ){
                totalRecebido += Number(e.post.amount);
            } 
            // Special argument for getting the total amount for the year
            else if( month === "all"&& e.post.amount >= 0) {
                totalRecebido += Number( e.post.amount );
            }
        })

        return totalRecebido;
    } else {
        data.map(e => {
            if( e.post.month === month && e.post.amount < 0 ){
                totalGasto += Number( e.post.amount );
            }
            else if( month === "all" && e.post.amount < 0) {
                totalGasto += Number( e.post.amount );
            }
        })
        return -totalGasto;
    }
}


export default React.memo(homePage);