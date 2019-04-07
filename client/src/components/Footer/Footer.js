import React from 'react';

import classes from "./Footer.module.css";

import { Col, Row } from "react-bootstrap";


const footer = () => {
    return (
        <div className={classes.Footer} >
            <Row className={classes.MainRow} >
                <Col className={classes.Desc} >
                    <h3 style={{color: "#30b84f", fontWeight: "bold"}}>Leafion</h3>
                    <p>Leafion is an application for the users.<br/>
                        So please let <a href="https://twitter.com/tiago_taquelim"
                          target="_blank" rel="noopener noreferrer"
                          className={classes.Highlight}>
                          @tiago_taquelim </a> know how to improve it!
                    </p>
                </Col>
                <Col>
                    <ul className={classes.ListLinks} >
                        <li><a href="#">How to use ?</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact me</a></li>                        
                    </ul>
                </Col>
            </Row>
            <hr style={{background: "#f9f9f9", margin: "40px 0"}}/>
            <Row>
                <ul className={classes.LinkSocials} >
                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-patreon"></i></a></li>
  
                </ul>
            </Row>
        </div>
    );
};

export default footer;