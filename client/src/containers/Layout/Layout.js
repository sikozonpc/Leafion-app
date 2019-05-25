import React from "react";

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

import { Container } from "react-bootstrap";

const layout = (props) => {
	return (
		<Container fluid style={{ padding: "0" }}>
			<Navbar
				setSearchResult={props.setSearchResult}
				name={props.name}
				isAuth={props.isAuth}
				activateWalletMode={props.activateWalletMode}
			/>

			<div className="content-app">{props.children}</div>

			<Footer />
		</Container>
	);
};

export default layout;
