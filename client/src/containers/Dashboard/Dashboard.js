import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ResultsTable from "../../components/ResultsTable/ResultsTable";
import DetailedData from "../../components/DetailedData/DetailedData";

import { Dropdown, DropdownButton, Row, Col, Container } from "react-bootstrap";

import classes from "./Dashboard.module.css";

const registryPage = (props) => {
	const [filter, setFilter] = useState(null);

	// if its null display all data, ignore the filter then
	let currentData;
	if (!filter) {
		currentData = props.items;
	} else {
		currentData = props.items.filter((e) => e.post.month === filter);
	}

	return (
		<>
			<div className={classes.TitleMain}>
				<h2 className={classes.Title}>Dashboard</h2>
				<span style={{ fontSize: "14px", color: "#777", margin: "0" }}>
					Manage, Filter, Add or remove your data
				</span>
			</div>
			<Container
				fluid
				style={{ paddingTop: "40px", paddingBottom: "60px" }}
			>
				<Row>
					<Col xs="12" md="12" lg="2" className={classes.Sidebar}>
						<ul className={classes.Sidebar__list}>
							<li className={classes.LinkSeparator}>
								<i className="fas fa-wrench" /> MANAGE
							</li>
							<li>
								<Link to="/add/income" className={classes.Link}>
									<i className="fas fa-plus" /> Add Income
								</Link>
							</li>
							<li>
								<Link
									to="/add/expense"
									className={classes.Link}
								>
									<i className="fas fa-minus" /> Add Expense
								</Link>
							</li>
							<li>
								<Link to="/Search" className={classes.Link}>
									<i className="fas fa-search" /> Search
								</Link>
							</li>
							<li>
								<Link to="/Search" className={classes.Link}>
									<i className="fas fa-sort-alpha-down" />{" "}
									Sort
								</Link>
							</li>
							<li
								className={classes.LinkSeparator}
								style={{ marginTop: "40px" }}
							>
								<i className="far fa-compass" /> DATA
							</li>
							<li>
								<Link to="/export" className={classes.Link}>
									<i className="far fa-file-excel" /> Download
									Data
								</Link>
							</li>
							<li>
								<Link to="/Search" className={classes.Link}>
									<i className="fas fa-database" /> Json
								</Link>
							</li>
						</ul>
					</Col>
					<Col
						xs="12"
						md="12"
						lg="10"
						className={classes.TableWrapper}
					>
						<DropdownButton
							title={<i className="fas fa-filter" />}
							id="dropdown-basic-button"
							drop="right"
							variant="primary"
						>
							<Dropdown.Item
								onClick={() => setFilter(null)}
								active={filter ? false : true}
							>
								Show All
							</Dropdown.Item>
							<Dropdown.Divider />
							{Object.keys(props.months).map((m) => {
								return (
									<Dropdown.Item
										key={m}
										active={
											filter === props.months[m]
												? true
												: false
										}
										onClick={() =>
											setFilter(props.months[m])
										}
									>
										{m}
									</Dropdown.Item>
								);
							})}
						</DropdownButton>

						<ResultsTable
							removeHandler={props.removeHandler}
							data={currentData}
						/>
					</Col>
				</Row>
				<Row style={{ marginTop: "40px" }}>
					<Col>
						<DetailedData data={currentData} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		items: state.appData.items,
		months: state.appData.months,
	};
};

export default connect(mapStateToProps)(registryPage);
