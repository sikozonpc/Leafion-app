import React from "react";

import TopBar from "../../../components/WalletComponents/TopBar/TopBar";

import classes from "../Wallet.module.css";

const Cart = (props) => {
	const itemsList = props.items.map((item) => (
		<li key={item.name + item.price}>
			<div className={classes["shopping-cart--item"]}>
				<span className={classes["shopping-cart--item__content"]}>
					<p
						className={
							classes["shopping-cart--item__content--price"]
						}
					>
						{item.price} €
					</p>
					<p
						className={
							classes["shopping-cart--item__content--name"]
						}
					>
						{item.name}
					</p>
				</span>
				<span
					className={classes.remove}
					onClick={(e) => props.removeItem(e, item)}
				>
					<i className="fas fa-trash-alt" />
				</span>
			</div>
		</li>
	));
	return (
		<div className={classes.walletpage}>
			<TopBar deactivateWalletMode={props.deactivateWalletMode} />
			<div className={classes["shopping-cart"]}>
				<h3>Shopping Cart</h3>

				<ul className={classes["shopping-cart--list"]}>{itemsList}</ul>
			</div>
		</div>
	);
};

export default Cart;
