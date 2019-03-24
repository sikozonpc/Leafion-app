import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { Container, Row, Col, Alert, Tabs, Tab } from "react-bootstrap";

import classes from "./HomePage.module.css";

import ExpenseSummary from "../../components/ExpenseSummary/ExpenseSummary";



const homePage = (props) => {
    console.log("[HomePage.js] @render | props: " , props);

    const recebidoGraphFormatedData = {};
    const gastoGraphFormatedData = {};

    //TODO: Add another line in the graph for the expect
    Object.keys(props.months).map( m => {
        return gastoGraphFormatedData[ m.slice(0,3) ] = getMoneyFromMonth(props.data, props.months[m], "g");
    });
    Object.keys(props.months).map( m => {
        return recebidoGraphFormatedData[ m.slice(0,3) ] = getMoneyFromMonth(props.data, props.months[m], "r");
    });

    return (
        <Container fluid>
            <Row className={classes.MainStatus} >
                <ExpenseSummary data={props.data} months={props.months} />
            </Row>
            <Row className={classes.Graphs} >
                <Tabs defaultActiveKey="reports" id="uncontrolled-tab">
                    <Tab eventKey="reports" title="Reports">
                        <h4 style={{textAlign: "center", marginTop:"20px" , background: "#68B067", padding: "20px"}}>
                            Overview of { new Date().getFullYear() } 
                        </h4>
                        <VictoryChart 
                            theme={VictoryTheme.material}>
                            <VictoryLine
                                style={{
                                data: { stroke: "#29963d" },
                                parent: { border: "1px solid #ccc"}
                                }}
                                data={[
                                { x: "Jan", y: recebidoGraphFormatedData["Jan"] },
                                { x: "Feb", y: recebidoGraphFormatedData["Feb"] },
                                { x: "Mar", y: recebidoGraphFormatedData["Mar"] },
                                { x: "Apr", y: recebidoGraphFormatedData["Apr"] },
                                { x: "May", y: recebidoGraphFormatedData["May"] },
                                { x: "Jun", y: recebidoGraphFormatedData["Jun"] },
                                { x: "Jul", y: recebidoGraphFormatedData["Jul"] },
                                { x: "Aug", y: recebidoGraphFormatedData["Aug"] },
                                { x: "Sep", y: recebidoGraphFormatedData["Sep"] },
                                { x: "Oct", y: recebidoGraphFormatedData["Oct"] },
                                { x: "Nov", y: recebidoGraphFormatedData["Nov"] },
                                { x: "Dec", y: recebidoGraphFormatedData["Dec"] }
                                ]}
                            />
                            <VictoryLine  height={400} width={400}
                            style={{
                            data: { stroke: "red" },
                            parent: { border: "1px solid #ccc" }
                            }}
                            data={[
                                { x: "Jan", y: gastoGraphFormatedData["Jan"] },
                                { x: "Feb", y: gastoGraphFormatedData["Feb"] },
                                { x: "Mar", y: gastoGraphFormatedData["Mar"] },
                                { x: "Apr", y: gastoGraphFormatedData["Apr"] },
                                { x: "May", y: gastoGraphFormatedData["May"] },
                                { x: "Jun", y: gastoGraphFormatedData["Jun"] },
                                { x: "Jul", y: gastoGraphFormatedData["Jul"] },
                                { x: "Aug", y: gastoGraphFormatedData["Aug"] },
                                { x: "Sep", y: gastoGraphFormatedData["Sep"] },
                                { x: "Oct", y: gastoGraphFormatedData["Oct"] },
                                { x: "Nov", y: gastoGraphFormatedData["Nov"] },
                                { x: "Dec", y: gastoGraphFormatedData["Dec"] }
                                ]}
                        />
                        </VictoryChart>
                    </Tab>
                    <Tab eventKey="cashflow" title="Cash Flow">
                        <h4 style={{textAlign: "center", marginTop:"20px" , background: "#68B067", padding: "20px"}}>
                           Where your money goes
                        </h4>
                        <h1  style={{textAlign: "center"}}>Work in Progress</h1>
           
                    </Tab>
                    <Tab eventKey="spendingpatterns" title="Spending Patterns" >
                        <h4 style={{textAlign: "center", marginTop:"20px" , background: "#68B067", padding: "20px"}}>
                            When do you spend your money
                        </h4>                
                        <h1  style={{textAlign: "center"}}>Work in Progress</h1>   
                    </Tab>
                </Tabs>
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