import React from "react";

import { Table, Button } from "react-bootstrap";
import formatMoney from "../../utils/formatMoney";
//
// Table results responsible for displaying the items
//
const resultsTable = (props) => {
	const { currency } = props;
	const tableData = props.data.map((e, i) => {
		return (
			<tr key={i}>
				<td>
					<b>{e.post.name}</b>
				</td>
				<td>{e.post.category}</td>
				<td>{e.post.date}</td>
				<td>{e.post.desc}</td>
				<td style={{ color: e.post.amount >= 0 ? "green" : "red" }}>
					{formatMoney(e.post.amount)} {currency}
				</td>

				<td>
					<Button
						variant="outline-danger"
						onClick={() => props.removeHandler(e._id)}
					>
						<i className="fas fa-times" />
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<Table
			striped
			bordered
			hover
			size="sm"
			responsive="md"
			style={{ marginTop: "20px" }}
		>
			<tbody>
				<tr>
					<th>Name</th>
					<th>Category</th>
					<th>Date</th>
					<th>Description</th>
					<th>Amount({currency})</th>
					<th />
				</tr>
				{tableData}
			</tbody>
		</Table>
	);
};

export default resultsTable;
