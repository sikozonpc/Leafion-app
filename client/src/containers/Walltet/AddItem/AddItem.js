import React, { useState } from "react";

import { Alert } from "react-bootstrap";
import TopBar from "../../../components/WalletComponents/TopBar/TopBar";
import Button from "../../../components/UI/Button/Button";

import classes from "../Wallet.module.css";

const addItem = (props) => {
	const [name, changeName] = useState("");
	const [price, changePrice] = useState(null);
	const [clicked, changeClicked] = useState(false);

	const message = clicked ? (
		<Alert className={classes.alert} variant="success">
			{name} succesfully added to the wallet.
		</Alert>
	) : null;

	// TODO: Then make the connections to the database, firebase to store all data;

	return (
		<div className={classes.walletpage}>
			<TopBar deactivateWalletMode={props.deactivateWalletMode} />
			<form
				className={classes["add-form"]}
				onSubmit={(event) => {
					changeClicked(true);
					props.addItem(event, { name: name, price: price });
				}}
			>
				<h3>
					<i className="fas fa-cart-plus" /> Add item
				</h3>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					type="text"
					placeholder="Item's name"
					onChange={(e) => changeName(e.target.value)}
				/>

				<label htmlFor="price">Price</label>
				<input
					id="price"
					type="number"
					placeholder="Item's price"
					required
					onChange={(e) => changePrice(e.target.value)}
				/>

				<Button>Add</Button>
				{message}
			</form>
		</div>
	);
};

export default addItem;
