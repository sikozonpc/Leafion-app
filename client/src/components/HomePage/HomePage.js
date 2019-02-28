import React from 'react';

import classes from "./HomePage.module.css";

const homePage = (props) => {
    console.log("[HomePage.js] @render | props: " , props.data);
   
    return (
        <div className={classes.Home}>
            <div className={classes.TableMain}>
                {Object.keys(props.months).map(m => {
                    return  <MonthItem 
                        key={m}
                        name={m}
                        totalRecebido={getMoneyFromMonth(props.data, props.months[m], "r")} 
                        totalGasto={getMoneyFromMonth(props.data, props.months[m], "g")} />
                })}
            </div>
        </div>
    );
};


const MonthItem = (props) => {

    return(
        <div className={classes.Item}>
            <h2>{props.name}</h2>
            <h4><span style={{"color":"green"}}>Recebido</span> - Gasto</h4>

            {
            props.totalGasto !== 0 ? 
            <p>
            <span style={{"color":"rgb(13, 192, 13)"}}>
                {props.totalRecebido.toFixed(2)} €  - </span>{props.totalGasto.toFixed(2)} €
            </p> : null
            }

            <h4 style={{"color":"black"}}  >Total</h4>
            <p style={{"color":"white"}}>{(props.totalRecebido - props.totalGasto).toFixed(2)} €</p>                 
        </div>
    );
}

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