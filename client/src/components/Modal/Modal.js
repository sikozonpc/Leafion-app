import React from 'react';

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";


const modal = (props) => {
    return (
        <>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={classes.Modal}>
                {props.children}
            </div>
        </>
    );
};


export default modal;