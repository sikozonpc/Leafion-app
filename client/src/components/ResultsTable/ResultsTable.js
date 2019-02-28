import React from 'react';

import classes from "./ResultsTable.module.css";

const resultsTable = (props) => {
    // Add func for not displaying when data is null
    const tableData =  props.data.map((e,i) =>{
        return (<tr key={i}>
        <td>{ e.post.dosier }</td>
        <td>{ e.post.nome }</td> 
        <td>{ e.post.dia } - { e.post.mes }</td>
        <td>{ e.post.descricao }</td>
        <td>{ e.post.gasto } €</td>
        <td>{ e.post.recebido } €</td>
        <td>{ e.post.outros }</td>
        <td><button name={e._id} className="btn-danger" 
            onClick={props.removeHandler}>X</button></td>
    </tr>)});


    return (
        <table className={classes.Table}>
        <tbody>
            <tr>
                <th>Dosier</th>
                <th>Nome/ Ação</th> 
                <th>Data</th>
                <th>Descrição</th>
                <th>Gasto(€)</th>
                <th>Recebido(€)</th>
                <th>Outros</th>
            </tr>
            {tableData}
        </tbody>
        </table>
    );
    
};

export default resultsTable;