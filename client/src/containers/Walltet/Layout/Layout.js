import React from "react";
import SideNav from "../../../components/WalletComponents/SidebarNav/SidebarNav";

import classes from "../Wallet.module.css";

const layout = (props) => {
	return (
		<div className={classes.container}>
			<SideNav
				items={[
					{ name: "Wallet", to: "/wallet" },
					{ name: "Add item", to: "/additemcart" },
					{ name: "Account info", to: "/account" },
				]}
				userName={props.userName}
			/>
			<div className={classes.walletpage}>{props.children}</div>
		</div>
	);
};

export default layout;
