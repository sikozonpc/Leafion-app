import React from "react";

import classes from "./MonthItem.module.css";


import { Card, ListGroup, Col } from "react-bootstrap";


const monthItem = (props) => {

    return(
        <Col xs={12} md={6} lg={3}>
        <Card>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                
                </Card.Text>
                <ListGroup variant="flush">
                <ListGroup.Item><span style={{"color":"green"}}>Recebido</span> - Gasto</ListGroup.Item>
                <ListGroup.Item> {
                    props.totalGasto !== 0 ? 
                    <p>
                    <span style={{"color":"rgb(13, 192, 13)"}}>
                        {props.totalRecebido.toFixed(2)} €  - </span>{props.totalGasto.toFixed(2)} €
                    </p> : null
                    }
                </ListGroup.Item>
                <ListGroup.Item>Total: {(props.totalRecebido - props.totalGasto).toFixed(2)} €</ListGroup.Item>
            </ListGroup>
            </Card.Body>
             
        </Card>
        </Col>
    );
}


export default monthItem;