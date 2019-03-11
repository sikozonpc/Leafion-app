import React from 'react';

import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar"; 


import { Container } from "react-bootstrap";


const layout = (props) => {
    return (
        <Container fluid>
            <Navbar setSearchResult={props.setSearchResult}/>

            <div className="content-app">
                {props.children}
            </div>
        
            <Footer />
      </Container>
    );
};

export default layout;