import React from 'react';

import classes from "./DetailedData.module.css"


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
    totalEarnedIVA =  totalEarned - (totalEarned * IVA).toFixed(2);

    let total = totalSpendings- totalEarned;

    let totalStyles = total > 0 ? successStyles : dangerStyles;
    if(total === 0){
        totalStyles = null;
    }

    return (
        <div className={classes.Data}>
                    <div className={classes.DataItem}>
                        <h3>nº of Actions: <strong>{numActions}</strong></h3>
                    </div>
                    <div className={classes.DataItem}>
                        <h3>Total Spent:</h3>
                        <p><strong>{totalSpendings} €</strong></p>
                    </div>
                    <div className={classes.DataItem}>
                        <h3>Total Earned:</h3>
                        <p><strong>{totalEarned} €</strong></p>
                        <p><i>+iva: ({totalEarnedIVA}) €</i></p>
                    </div>
                    <div className={classes.DataItem} style={totalStyles}>
                        <h3>Total:</h3>
                        <p><strong>{totalSpendings} - {totalEarned} = {total} €</strong></p>
                    </div>
                </div>
    );
};


const successStyles = {
    "backgroundColor": "rgb(42, 156, 42)",
    "color": "white",
    "border": "1px solid #333"
};
const dangerStyles = {
    "backgroundColor": "rgb(233, 50, 50)",
    "color": "white",
    "border": "1px solid #333"
};



export default detailedData;