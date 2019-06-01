import React, { useState } from "react";

import TopBar from "../../../components/WalletComponents/TopBar/TopBar";
import Button from "../../../components/UI/Button/Button";

import formatMoney from "../../../utils/formatMoney";
import classes from "../Wallet.module.css";

const walletView = (props) => {
	const bal = formatMoney(props.balance);
	const [funds, changeFunds] = useState(0);

	return (
		<div className={classes.walletpage}>
			<TopBar deactivateWalletMode={props.deactivateWalletMode} />
			<div className={classes["walletview"]}>
				<h3>Wallet Balance</h3>
				<div className={classes["walletview--money"]}>
					<span>{bal} €</span>
				</div>
				<div>
					<input
						type="number"
						placeholder="Funds to add..."
						onChange={(e) => changeFunds(e.target.value)}
					/>
					<Button
						clickEvent={() => props.addFunds(funds)}
						variant="outline-green"
					>
						Add
					</Button>
				</div>
				<p>
					Add the items you are purchasing when your are shopping{" "}
					<br />
					or add the items you plan to purchase
				</p>
			</div>
			<div className={classes.btn}>
				<Button link toLink="/additemcart">
					Add
				</Button>
			</div>
		</div>
	);
};

export default walletView;
