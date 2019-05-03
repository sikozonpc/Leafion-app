import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

import classes from "./Navbar.module.css";

const navbar = (props) => {
	let navbar = (
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ml-auto">
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/items"
				>
					Dashboard
				</Link>
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/goals"
				>
					Goals
				</Link>
				<Link
					className={["nav-link", classes.Link].join(" ")}
					to="/settings"
				>
					Settings
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
					}}
					to="/search"
				>
					Search
				</Link>
			</Form>
			{/* User name and avatar  */}
			{props.name ? (
				<Link
					to="/settings"
					style={{
						textDecoration: "none",
						marginLeft: "20px",
					}}
				>
					<span style={{ fontWeight: "bold", color: "#555" }}>
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
						style={{ margin: "0 15px" }}
						to="/signin"
					>
						Sign in
					</Link>
					<Link
						className="btn btn-success"
						style={{
							color: "#fff",
							backgroundColor: "#38D39F",
							border: "0",
						}}
						to="/login"
					>
						Log In
					</Link>
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
