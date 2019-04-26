import React from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const button = (props) => {
	let variant = "Button";
	if (props.variant === "outline-green") {
		variant = "ButtonOutline";
	}
	let button = (
		<button
			className={classes[variant]}
			onClick={props.clickEvent}
			required={props.required}
		>
			{props.children}
		</button>
	);
	if (props.link) {
		button = (
			<Link
				className={classes[variant]}
				onClick={props.clickEvent}
				to={props.toLink}
			>
				{props.children}
			</Link>
		);
	}

	return button;
};

export default button;
