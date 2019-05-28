import React from "react";
import SideNav from "../../../components/WalletComponents/SidebarNav/SidebarNav";

import classes from "../Wallet.module.css";

const layout = (props) => {
	return (
		<div className={classes.container}>
			<SideNav
				items={[
					{ name: "Wallet", to: "/wallet", icon: "fas fa-wallet" },
					{
						name: "Add",
						to: "/additemcart",
						icon: "far fa-plus-square",
					},
					{ name: "Account", to: "/account", icon: "fas fa-user" },
				]}
				userName={props.userName}
				deactivateWalletMode={props.deactivateWalletMode}
			/>
			<div className={classes.walletpage}>{props.children}</div>
		</div>
	);
};

export default layout;
