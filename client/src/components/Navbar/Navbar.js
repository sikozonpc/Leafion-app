import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import Button from "../UI/Button/Button";

import classes from "./Navbar.module.css";

const navbar = (props) => {
	let navbar = (
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ml-auto">
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/wallet"
					onClick={props.activateWalletMode}
				>
					Wallet
				</Link>
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/items"
				>
					Dashboard
				</Link>
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/settings"
				>
					Settings & Goals
				</Link>
			</Nav>
			<Form inline>
				<FormControl
					type="text"
					onChange={(e) => props.setSearchResult(e.target.value)}
					placeholder="Search"
					className="mr-sm-2"
				/>
				<Link
					className="btn btn-success"
					style={{
						color: "#fff",
						backgroundColor: "#38D39F",
						border: "0",
						fontSize: "1.6rem",
					}}
					to="/search"
				>
					Search
				</Link>
			</Form>
			{/* User name and avatar  */}
			{props.name ? (
				<Link to="/settings" className={classes.UserContainer}>
					<span
						style={{
							fontWeight: "bold",
							color: "#555",
							fontSize: "1.8rem",
						}}
					>
						{props.name}{" "}
					</span>
					<span className={classes.User}> {props.name[0]}</span>
				</Link>
			) : null}
		</Navbar.Collapse>
	);

	if (!props.isAuth) {
		navbar = (
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Link
						className={["nav-link", classes.Link].join(" ")}
						style={{ margin: "0 1.5rem" }}
						to="/signin"
					>
						Sign in
					</Link>
					<Button link toLink="/login">
						Log In
					</Button>
				</Nav>
			</Navbar.Collapse>
		);
	}
	return (
		<Navbar className={classes.Navbar} fixed expand="lg">
			<Link
				className={["navbar-brand", classes.Brand].join(" ")}
				to="/home"
			>
				<i className="fas fa-leaf" style={{ color: "##33BE8F" }} />
				{"  "} {"  "}
				Leafion
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			{navbar}
		</Navbar>
	);
};

export default navbar;
