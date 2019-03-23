import React from 'react';

import classes from "./ResultsTable.module.css";

import { Table } from "react-bootstrap";

const resultsTable = (props) => {
    // Add func for not displaying when data is null
    const tableData =  props.data.map((e,i) =>{
        return (<tr key={i}>
        <td><b>{ e.post.nome }</b></td> 
        <td>{ e.post.dosier }</td>
        <td>{ e.post.date }</td>
        <td>{ e.post.time }</td>
        <td>{ e.post.descricao }</td>
        <td style={{color:"green"}}>{ e.post.recebido } €</td>
        <td style={{color:"red"}}>{ e.post.gasto } €</td>
        <td>{ e.post.outros }</td>
        <td><button className="btn-danger" 
            onClick={() => props.removeHandler(e._id)}><i className="fas fa-trash-alt"></i></button></td>
    </tr>)});


    return (
        <Table striped bordered hover size="sm" responsive="md" 
            style={{marginTop:"20px"}}>
        <tbody>
            <tr >
                <th>Name</th> 
                <th>Dosier</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Income(€)</th>
                <th>Expense(€)</th>
                <th>Note</th>
                <th></th>
            </tr>
            {tableData}
        </tbody>
        </Table>
    );
    
};

export default resultsTable;