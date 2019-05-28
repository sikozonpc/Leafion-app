import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const button = ({
	variant = "Button",
	clickEvent,
	required,
	children,
	link,
	toLink,
}) => {
	if (variant === "outline-green") {
		variant = "ButtonOutline";
	}
	if (variant === "outline-green--test-acc") {
		variant = "ButtonOutlineTestAcc";
	}
	let button = (
		<button
			className={classes[variant]}
			onClick={clickEvent}
			required={required}
		>
			{children}
		</button>
	);
	if (link) {
		button = (
			<Link className={classes[variant]} onClick={clickEvent} to={toLink}>
				{children}
			</Link>
		);
	}

	return button;
};

export default button;
