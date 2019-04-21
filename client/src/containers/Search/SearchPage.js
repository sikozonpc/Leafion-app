import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import classes from "./SearchPage.module.css";

import ResultsTable from "../../components/ResultsTable/ResultsTable";
import notFound from "../../assets/svg/undraw_empty_xct9.svg";

//
// Responsible for getting & displaying seach results
//
const searchPage = (props) => {
	const regex = new RegExp(props.search, "gi");

	// Logic for filtering the search result
	const result = props.items.filter((p) => {
		// If the search is empty then return null
		if ("/(?:)/gi".match(regex)) {
			return null;
		} else {
			return (
				p.post.category.match(regex) ||
				p.post.date.match(regex) ||
				p.post.name.match(regex)
			);
		}
	});

	const resultDisplay = result.length ? (
		<ResultsTable data={result} removeHandler={props.removeHandler} />
	) : (
		<div>
			<h3
				style={{
					textAlign: "center",
					color: "gray",
					margin: "50px",
				}}
			>
				Results not found
			</h3>
			<img
				style={{
					display: "block",
					width: "35%",
					margin: "auto",
					marginBottom: "100px",
				}}
				src={notFound}
				alt="Not found ilustration"
			/>
		</div>
	);

	return (
		<Container style={{ margin: "50px auto" }}>
			<h1 className={classes.h1}>
				Searching for:
				<span style={{ color: "green" }}> {props.search}</span>
			</h1>
			{resultDisplay}
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		items: state.appData.items,
	};
};

export default connect(mapStateToProps)(searchPage);
