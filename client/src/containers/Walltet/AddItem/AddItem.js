import React from "react";

import TopBar from "../../../components/WalletComponents/TopBar/TopBar";

import classes from "../Wallet.module.css";

const addItem = (props) => {
	return (
		<div className={classes.walletpage}>
			<TopBar deactivateWalletMode={props.deactivateWalletMode} />
		</div>
	);
};

export default addItem;
