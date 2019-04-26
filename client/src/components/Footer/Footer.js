import React from "react";

import classes from "./Footer.module.css";

import { Col, Row } from "react-bootstrap";

const footer = () => {
	return (
		<div className={classes.Footer}>
			<Row className={classes.MainRow}>
				<Col className={classes.Desc} md lg xl="8">
					<h3 className={classes.Title}>
						<i
							className="fas fa-leaf"
							style={{ color: "##33BE8F" }}
						/>
						{"  "} {"  "}
						Leafion
					</h3>
					<p>
						Leafion is an application made by the users for the
						users.
						<br />
						So please let{" "}
						<a
							href="https://twitter.com/tiago_taquelim"
							target="_blank"
							rel="noopener noreferrer"
							className={classes.Highlight}
						>
							@tiago_taquelim{" "}
						</a>{" "}
						know how to improve it!
					</p>
				</Col>
				<Col md lg xl="4">
					<ul className={classes.ListLinks}>
						<li>
							<a href="#">How to use ?</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Contact me</a>
						</li>
					</ul>
				</Col>
			</Row>
			<hr style={{ background: "#ccc", margin: "20px 0" }} />
			<Row>
				<ul className={classes.LinkSocials}>
					<li>
						<a href="#" target="_blank">
							<i className="fab fa-facebook-f" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank">
							<i className="fab fa-twitter" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank">
							<i className="fab fa-linkedin-in" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank">
							<i className="fab fa-instagram" />
						</a>
					</li>
					<li>
						<a href="#" target="_blank">
							<i className="fab fa-patreon" />
						</a>
					</li>
				</ul>
			</Row>
		</div>
	);
};

export default footer;
