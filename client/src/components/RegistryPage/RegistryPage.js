import React, {useState} from 'react';
import { Link } from "react-router-dom";

import ResultsTable from "../ResultsTable/ResultsTable";
import DetailedData from "./DetailedData/DetailedData";


import { Dropdown,DropdownButton, Row, Col, Container, ListGroup} from "react-bootstrap";


const registryPage = (props) => {
    const [filter, setFilter] = useState(null);


    // if its null display all data, ignore the filter then
    let currentData;
    if(!filter){
        currentData = props.data;
    } else {
        currentData = props.data.filter(e => e.post.month === filter);
    }

   
    return (
        <Container fluid style={{paddingTop:"40px", paddingBottom:"40px"}}>
            <Row>
            <Col xs="12" md="12" lg="2" >
                <ListGroup variant="flush" >
                    <ListGroup.Item variant="success">Dashboard</ListGroup.Item>
                    <ListGroup.Item><i className="fas fa-wrench"></i> MANAGE</ListGroup.Item>
                    <ListGroup.Item><Link to="/add/income"><i className="fas fa-plus"></i> Add Income</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/add/expense"><i className="fas fa-minus"></i> Add Expense</Link></ListGroup.Item>
                    <ListGroup.Item><Link to="/Search"><i className="fas fa-search"></i> Search</Link></ListGroup.Item>
                    <ListGroup.Item><a href="#"><i className="fas fa-sort-alpha-down"></i> Sort</a></ListGroup.Item>
                    <ListGroup.Item><i className="far fa-compass"></i> DATA</ListGroup.Item>
                    <ListGroup.Item><Link to="/export"><i className="far fa-file-excel"></i> Export to Excel</Link></ListGroup.Item>
                    <ListGroup.Item><a href="#"><i className="fas fa-database"></i> Json</a></ListGroup.Item>
                </ListGroup>
            </Col>
            <Col xs="12" md="12" lg="10">
                <DropdownButton title={<i className="fas fa-filter"></i>}
                     id="dropdown-basic-button"
                     drop="right"
                     variant="primary">

                    <Dropdown.Item  onClick={() => setFilter(null)}
                        active={filter ? false : true} >
                        Show All
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {Object.keys(props.months).map(m => {
                        return <Dropdown.Item key={m}
                                    active={filter === props.months[m] ? true : false}
                                    onClick={() => setFilter(props.months[m])}>
                                    {m}
                                </Dropdown.Item>
                    })}
                </DropdownButton>
              
                <ResultsTable 
                    removeHandler={ props.removeHandler}
                    data={currentData}/> 
            </Col>
            </Row>
            <Row style={{marginTop:"40px"}}>
                <Col>
                    <DetailedData data={currentData} />
                </Col>
            </Row>
        </Container>
    );
};

export default registryPage;