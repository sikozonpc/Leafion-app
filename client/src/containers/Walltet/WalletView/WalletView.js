import React from "react";

import TopBar from "../../../components/WalletComponents/TopBar/TopBar";
import Button from "../../../components/UI/Button/Button";

import formatMoney from "../../../utils/formatMoney";
import classes from "../Wallet.module.css";

const walletView = (props) => {
	const bal = formatMoney(props.balance);
	const itemsList = props.items.map((item) => (
		<li>
			{item.name} | {item.price}{" "}
		</li>
	));

	return (
		<div className={classes.walletpage}>
			<TopBar deactivateWalletMode={props.deactivateWalletMode} />
			<div className={classes["walletview"]}>
				<h3>Wallet Balance</h3>
				<div className={classes["walletview--money"]}>
					<span>{bal} €</span>
				</div>
				<p>
					Add the items you are purchasing when your are shopping{" "}
					<br />
					or add the items you plan to purchase
				</p>
			</div>
			<div className={classes["shopping-cart"]}>
				<h3>Shopping Cart</h3>
				{/* Add logic */}
				<Button link toLink="/additemcart">
					Add
				</Button>
				<ul className={classes["shopping-cart--list"]}>{itemsList}</ul>
			</div>
		</div>
	);
};

export default walletView;
