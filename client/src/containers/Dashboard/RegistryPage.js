import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ResultsTable from "../../components/ResultsTable/ResultsTable";
import DetailedData from "../../components/DetailedData/DetailedData";

import {
	Dropdown,
	DropdownButton,
	Row,
	Col,
	Container,
	ListGroup,
} from "react-bootstrap";

import classes from "./RegistryPage.module.css";

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
		<Container fluid style={{ paddingTop: "40px", paddingBottom: "40px" }}>
			<Row>
				<Col xs="12" md="12" lg="2">
					<ListGroup variant="flush">
						<ListGroup.Item variant="success">
							Dashboard
						</ListGroup.Item>
						<ListGroup.Item>
							<i className="fas fa-wrench" /> MANAGE
						</ListGroup.Item>
						<ListGroup.Item>
							<Link to="/add/income">
								<i className="fas fa-plus" /> Add Income
							</Link>
						</ListGroup.Item>
						<ListGroup.Item>
							<Link to="/add/expense">
								<i className="fas fa-minus" /> Add Expense
							</Link>
						</ListGroup.Item>
						<ListGroup.Item>
							<Link to="/Search">
								<i className="fas fa-search" /> Search
							</Link>
						</ListGroup.Item>
						<ListGroup.Item>
							<a href="#">
								<i className="fas fa-sort-alpha-down" /> Sort
							</a>
						</ListGroup.Item>
						<ListGroup.Item>
							<i className="far fa-compass" /> DATA
						</ListGroup.Item>
						<ListGroup.Item>
							<Link to="/export">
								<i className="far fa-file-excel" /> Export to
								Excel
							</Link>
						</ListGroup.Item>
						<ListGroup.Item>
							<a href="#">
								<i className="fas fa-database" /> Json
							</a>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col xs="12" md="12" lg="10" className={classes.TableWrapper}>
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
									onClick={() => setFilter(props.months[m])}
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
	);
};

const mapStateToProps = (state) => {
	return {
		items: state.appData.items,
		months: state.appData.months,
	};
};

export default connect(mapStateToProps)(registryPage);
