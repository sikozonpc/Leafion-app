import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/Modal/Modal";

import { Container, Form } from "react-bootstrap";
import classes from "./AddItemPage.module.css";

const OPTIONS = [
	"💰 Salary",
	"😀 Kids",
	"🎁 Gift",
	"🥔 Food",
	"🎥 Entertainment",
	"👚 Clothes",
	"📺 Eletronics",
	"🚌 Transportation",
	"⛽ Fuel",
	"☕ Coffee",
	"🏘️ House",
	"🔵 Others",
];

class AddItemPage extends React.Component {
	state = {
		month: "jan",
		date: "",
		name: "",
		desc: "",
		amount: 0,
		category: "Choose...",
		startDate: null,

		transactionType: "",

		responseToPost: null,
		errors: {},
		show: false,
	};

	// Sets the type of transaction
	componentDidMount() {
		const transactionType = this.props.match.params.transaction;
		if (transactionType === "income" || transactionType === "expense") {
			this.setState({
				transactionType: transactionType,
				amount: transactionType === "income" ? 1 : -1,
			});
		} else {
			this.props.history.push("/items");
		}
	}

	// TODO: Validation & Error handling
	handleValidation = () => {
		let formIsValid = true;
		let errors = {};

		// Category
		if (this.state.category === "Choose...") {
			formIsValid = false;
			errors["CATEGORY"] = "this field is required";
			console.log("ERROR: Name field is empty.");
		}

		// name
		if (!this.state.name) {
			formIsValid = false;
			errors["NAME"] = "this field is required!";
			console.log("ERROR: Name field is empty.");
		}
		if (!this.state.startDate) {
			formIsValid = false;
			errors["DATE"] = "this field is required!";
			console.log("ERROR: Date field is empty.");
		}
		this.setState({ errors: errors });

		return formIsValid;
	};

	onChangeHandle = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	changeDateHandler = (date) => {
		// Format the date to what I want
		let arrayDate = date.toString().split(" ");

		this.setState({
			startDate: date,
			date: [...arrayDate].slice(1, 4).join("/"),
			month: arrayDate[1].toLowerCase(),
		});
	};

	hideModal = () => {
		this.setState({ show: false });
		// Redirects the user to the dashboard using the props from React Router Dom
		this.props.history.push("/items");
		//TODO:-> Make state update somehow in the dashboard  window.location.reload();
	};
	showModal = () => {
		this.setState({ show: true });
	};

	submitHandler = (e) => {
		e.preventDefault();

		if (this.handleValidation()) {
			// Show modal
			this.showModal();
			const item = JSON.stringify({
				post: {
					email: this.props.email,
					date: this.state.date,
					month: this.state.month,
					category: this.state.category,
					name: this.state.name,
					desc: this.state.desc,
					amount: this.state.amount,
				},
			});

			// Dispatch action
			this.props.onAddItem(item);
		}
	};

	changeTransactionType = () => {
		let newTrans;
		if (this.state.transactionType === "income") {
			newTrans = "expense";
		} else {
			newTrans = "income";
		}
		this.props.history.push("/add/" + newTrans);
		this.setState({ transactionType: newTrans });
		document.location.reload();
	};

	render() {
		// Basic error handler for client side auth in case the native browser one
		// doesn't work.
		const errorsList = Object.keys(this.state.errors).map((e) => {
			return (
				<p className={classes.Errors} key={e}>
					Error {e}: {this.state.errors[e]}
				</p>
			);
		});
		return (
			<Container style={{ marginTop: "40px", marginBottom: "40px" }}>
				{this.state.show ? (
					<Modal show={this.state.show} clicked={this.hideModal}>
						<h2>
							<i className="fas fa-map-marker" /> Transaction
							Added
						</h2>
						<ul>
							<li>
								Name: <strong>{this.state.name}</strong>
							</li>
							<li>
								Descripton: <strong>{this.state.desc}</strong>
							</li>
							<li>
								Date: <strong>{this.state.date}</strong>
							</li>
							<li>
								Month: <strong>{this.state.month}</strong>
							</li>
							<li>
								Amount: <strong>{this.state.amount} €</strong>
							</li>
						</ul>
						<Button clickEvent={this.hideModal}>Continue</Button>
					</Modal>
				) : null}

				<Form onSubmit={this.submitHandler}>
					<Form.Group>
						<a
							style={{ color: "blue", float: "right" }}
							onClick={this.changeTransactionType}
							href={"#"}
						>
							switch to{" "}
							{this.state.transactionType === "income"
								? "expense"
								: "income"}
						</a>
						<h2>
							<i className="fas fa-plus-square" />{" "}
							{this.state.transactionType.toUpperCase()}{" "}
						</h2>
						{errorsList}

						<Form.Label htmlFor="name"> Name * </Form.Label>
						<Form.Control
							name="name"
							required
							type="text"
							value={this.state.name}
							placeholder="Action name here..."
							onChange={this.onChangeHandle}
						/>

						<Form.Group controlId="addForm">
							<Form.Label>Category * </Form.Label>
							<Form.Control
								as="select"
								required
								value={this.state.category}
								name="category"
								onChange={this.onChangeHandle}
							>
								<option defaultValue>Choose...</option>
								{OPTIONS.map((opt) => {
									return <option key={opt}> {opt} </option>;
								})}
							</Form.Control>
						</Form.Group>
						<Form.Label htmlFor="datepicker">Date *</Form.Label>
						<Form.Group>
							<DatePicker
								placeholderText="Click to select a date"
								name="datepicker"
								required
								withPortal
								className={classes.DatePicker}
								selected={this.state.startDate}
								onChange={this.changeDateHandler}
							/>
						</Form.Group>

						<Form.Label htmlFor="desc">Description</Form.Label>
						<Form.Control
							name="desc"
							type="text"
							value={this.state.desc}
							placeholder="Description here..."
							onChange={this.onChangeHandle}
						/>

						<Form.Label htmlFor="amount">Amount * </Form.Label>
						<Form.Control
							name="amount"
							type="number"
							required
							value={this.state.amount}
							onChange={this.onChangeHandle}
						/>
						<div style={{ marginTop: "20px" }}>
							<Button type="submit">Add</Button>
						</div>
					</Form.Group>
				</Form>
			</Container>
		);
	}
}

export const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		onAddItem: (item) => dispatch(actions.addItem(item)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddItemPage);
