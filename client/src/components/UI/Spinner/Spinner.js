import React from 'react';

import classes from "./Spinner.module.css";


const spinner = () => (
	<div style={{margin:"200px auto", height:"100vh"}}>
		<div className={classes.Loader} >Loading...</div>
	</div>
);


export default spinner;