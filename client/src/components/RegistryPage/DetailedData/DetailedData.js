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
    totalEarnedIVA =  (totalEarned - (totalEarned * IVA)).toFixed(2);

    let total = (totalEarned - totalSpendings ).toFixed(2);

    let totalStyles = total > 0 ? successStyles : dangerStyles;
    if(total === 0){
        totalStyles = null;
    }

    return (
        <div className={classes.Data}>
                    <div className={classes.DataItem}>
                        <h3><i className="far fa-bookmark"></i> Actions: <strong>{numActions}</strong></h3>
                    </div>
                    <div className={classes.DataItem}>
                        <h3><i className="fas fa-minus"></i> Total Spent:</h3>
                        <p><strong>{totalSpendings} €</strong></p>
                    </div>
                    <div className={classes.DataItem}>
                        <h3><i className="fas fa-plus"></i> Total Earned:</h3>
                        <p><strong>{totalEarned} €</strong></p>
                        <p><i>+iva: ({totalEarnedIVA}) €</i></p>
                    </div>
                    <div className={classes.DataItem} style={totalStyles}>
                        <h3>Total:</h3>
                        <p><strong>{totalEarned} - {totalSpendings} = {total} €</strong></p>
                    </div>
                </div>
    );
};


const successStyles = {
    "color": "rgb(42, 156, 42)",
    "borderColor": "rgb(42, 156, 42)"
};
const dangerStyles = {
    "color": "rgb(233, 50, 50)",
    "borderColor": "rgb(233, 50, 50)"
};



export default detailedData;