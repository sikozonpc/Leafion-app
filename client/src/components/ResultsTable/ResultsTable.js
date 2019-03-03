import React from 'react';

import classes from "./ResultsTable.module.css";

const resultsTable = (props) => {
    // Add func for not displaying when data is null
    const tableData =  props.data.map((e,i) =>{
        return (<tr key={i}>
        <td><b>{ e.post.nome }</b></td> 
        <td>{ e.post.dosier }</td>
        <td>{ e.post.date }</td>
        <td>{ e.post.time }</td>
        <td>{ e.post.descricao }</td>
        <td>{ e.post.gasto } €</td>
        <td>{ e.post.recebido } €</td>
        <td>{ e.post.outros }</td>
        <td><button className="btn-danger" 
            onClick={() => props.removeHandler(e._id)}><i className="fas fa-trash-alt"></i></button></td>
    </tr>)});


    return (
        <table className={classes.Table} cellSpacing="0">
        <tbody>
            <tr className={classes.trMain} >
                <th>Name</th> 
                <th>Dosier</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Spent(€)</th>
                <th>Earned(€)</th>
                <th>Others</th>
                <th></th>
            </tr>
            {tableData}
        </tbody>
        </table>
    );
    
};

export default resultsTable;