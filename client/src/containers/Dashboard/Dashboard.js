import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import ResultsTable from "../../components/ResultsTable/ResultsTable";
import DetailedData from "../../components/DetailedData/DetailedData";
import PageHeader from "../../components/PageHeader/PageHeader";
import { Dropdown, DropdownButton, Row, Col, Container } from "react-bootstrap";

import classes from "./Dashboard.module.css";

class Dashboard extends Component {
	state = {
		filter: null,
	};

	render() {
		// if its null display all data, ignore the filter then
		let currentData;
		if (!this.state.filter) {
			currentData = this.props.items;
		} else {
			currentData = this.props.items.filter(
				(e) => e.post.month === this.state.filter
			);
		}

		if (this.props.refetch) {
			this.props.onFetchItems(this.props.email);
		}

		return (
			<>
				<PageHeader
					title="Dashboard"
					desc="Manage, Filter, Add or remove your data"
				/>
				<Container
					fluid
					style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
				>
					<Row>
						<Col xs="12" md="12" lg="2" className={classes.Sidebar}>
							<ul className={classes.Sidebar__list}>
								<li className={classes.LinkSeparator}>
									<i className="fas fa-wrench" /> MANAGE
								</li>
								<li>
									<Link
										to="/add/income"
										className={classes.Link}
									>
										<i className="fas fa-plus" /> Add Income
									</Link>
								</li>
								<li>
									<Link
										to="/add/expense"
										className={classes.Link}
									>
										<i className="fas fa-minus" /> Add
										Expense
									</Link>
								</li>
								<li>
									<Link to="/Search" className={classes.Link}>
										<i className="fas fa-search" /> Search
									</Link>
								</li>
								<li>
									<span
										className={classes.Link}
										onClick={this.props.onSortItems}
									>
										<i className="fas fa-sort-alpha-down" />{" "}
										Sort
									</span>
								</li>
								<li
									className={classes.LinkSeparator}
									style={{ marginTop: "40px" }}
								>
									<i className="far fa-compass" /> DATA
								</li>
								<li>
									<Link to="/export" className={classes.Link}>
										<i className="far fa-file-excel" />{" "}
										Download Data
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
								className={classes.DropdownBtn}
								title={<i className="fas fa-filter" />}
								id="dropdown-basic-button"
								drop="right"
								variant="primary"
							>
								<Dropdown.Item
									style={{ fontSize: "1.7rem" }}
									onClick={() =>
										this.setState({ filter: null })
									}
									active={this.state.filter ? false : true}
								>
									Show All
								</Dropdown.Item>
								<Dropdown.Divider />
								{Object.keys(this.props.months).map((m) => {
									return (
										<Dropdown.Item
											style={{ fontSize: "1.7rem" }}
											key={m}
											active={
												this.state.filter ===
												this.props.months[m]
													? true
													: false
											}
											onClick={() =>
												this.setState({
													filter: this.props.months[
														m
													],
												})
											}
										>
											{m}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>

							{this.props.items.length !== 0 ? (
								<ResultsTable
									currency={this.props.currency}
									removeHandler={this.props.removeHandler}
									data={currentData}
								/>
							) : (
								<p className={classes.Warning}>
									No transactions recorded.
								</p>
							)}
						</Col>
					</Row>
					<Row style={{ marginTop: "4rem" }}>
						<Col>
							<DetailedData
								data={currentData}
								currency={this.props.currency}
							/>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.appData.items,
		months: state.appData.months,
		refetch: state.appData.refetch,
		email: state.auth.email,
		currency: state.settings.currency,
	};
};

const mapDispatctToProps = (dispatch) => {
	return {
		onSortItems: () => dispatch(actions.sortItems()),
		onFetchItems: (email) => dispatch(actions.fetchItems(email)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatctToProps
)(Dashboard);
