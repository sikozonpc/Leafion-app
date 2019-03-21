import React from "react";
import DatePicker from "react-datepicker";

import Modal from "../Modal/Modal";

import classes from "./AddItemPage.module.css";
import "react-datepicker/dist/react-datepicker.css";


import { Container, Form, Button, Col } from "react-bootstrap";


class AddItemPage extends React.Component {
    state = {
        mes: "jan",
        date: "",
        nome: "",
        descricao: "",
        time: "",
        gasto: 0,
        recebido: 0 ,
        outros: "",
        dosier: "",
        startDate: null,

        responseToPost: null,
        errors: {},
        show: false
    }

    componentDidMount(){
        console.log(this.props)
    }

    // TODO:
    handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        // Nome
        if(!this.state.nome){
            formIsValid = false;
            errors["NAME"] = "this field is required!";
            console.log("ERROR: Name field is empty.");
        }
        if(!this.state.startDate){
            formIsValid = false;
            errors["DATE"] = "this field is required!";
            console.log("ERROR: Date field is empty.");
        }
         this.setState({errors: errors})
    
         return formIsValid;
    }

    onChangeHandle = (e) =>{
        const {name, value} = e.target;
        this.setState({ [name]: value });
  
    }

    changeDateHandler = (date) => {
        // Format the date to what I want
        let arrayDate = date.toString().split(" ");

        this.setState({
            startDate: date,
            date: [...arrayDate].slice(1,4).join("/"),
            time: arrayDate[4],
            mes: arrayDate[1].toLowerCase()
        });
    }
    
    hideModal = () => {
        this.setState({show: false })
        // Redirects the user to the dashboard using the props from React Router Dom
        this.props.history.push("/items")
    }
    showModal = () => {
        this.setState({show: true })
    }

    submitHandler = (e) => {
        e.preventDefault();

        if(this.handleValidation()){
            // Show modal
            this.showModal();

            fetch('/items/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post: {
                "date": this.state.date,
                "mes": this.state.mes,
                "dosier": this.state.dosier,
                "time": this.state.time,
                "nome": this.state.nome,
                "descricao": this.state.descricao, 
                "gasto": this.state.gasto,
                "recebido": this.state.recebido,
                "outros": this.state.outros
                 } }),
            })
            .then(e =>{
                this.setState({responseToPost: e.text() })
            });
        } else {
            window.scrollTo(0, 0);
        } 
      }

      
      render(){
            // Basic error handler for client side auth in case the native browser one
            // doesn't work.
            const errorsList = Object.keys(this.state.errors).map(e => {
                return <p className={classes.Errors}
                            key={e}>Error {e}: {this.state.errors[e]}</p>
        });
          return(
              <Container style={{marginTop:"40px", marginBottom:"40px"}}>
              {this.state.show ? <Modal show={this.state.show} clicked={this.hideModal}>
                    <h2>Action Added !</h2>
                    <p>To <strong>{this.state.dosier}</strong> dosier.</p>
                    <ul>
                        <li>Name: <strong></strong>{this.state.nome}</li>
                        <li>Descripton: <strong>{this.state.descricao}</strong></li>
                        <li>Date: <strong>{this.state.date}</strong></li>
                        <li>Month: <strong>{this.state.mes}</strong></li>
                        <li>Time: <strong>{this.state.time}</strong></li>
                        <li>Spent: <strong>{this.state.gasto} €</strong></li>
                        <li>Earn: <strong>{this.state.recebido} €</strong></li>
                        <li>Others: <strong>{this.state.outros}</strong></li>
                    </ul>
                    <button 
                        onClick={this.hideModal}
                        className={classes.BtnInverted}>Continue</button>
                </Modal> : null}
                

                <Form onSubmit={this.submitHandler}>
                    <Form.Group  controlId="addItemForm">
                        <h2><i className="fas fa-plus-square"></i> ADD NEW ACTION</h2>
                        {errorsList}
                        <Form.Label htmlFor="nome">Action Name *: </Form.Label>
                        <Form.Control name="nome" 
                            required
                            type="text" 
                            value={this.state.nome} placeholder="Action name here..."
                            onChange={this.onChangeHandle}/>

                        <Form.Label htmlFor="dosier">Dosier: </Form.Label>

                        <Form.Control name="dosier" 
                            type="text" 
                            placeholder="Ex: 1AB..."
                            value={this.state.dosier.toUpperCase()}
                            onChange={this.onChangeHandle} />

                        <Form.Label htmlFor="datepicker">Date & Time *:</Form.Label>
                        <Form.Group>
                            <DatePicker name="datepicker"
                                required
                                className={classes.DatePicker}
                                showTimeSelect
                                selected={this.state.startDate}
                                onChange={this.changeDateHandler}/>
                        </Form.Group>
                        

                        <Form.Label htmlFor="descricao">Description:</Form.Label>
                        <Form.Control name="descricao" 
                                    type="text" 
                                    value={this.state.descricao} placeholder="Description here..."
                                    onChange={this.onChangeHandle} />

                        <Form.Row>
                            <Col>
                                <Form.Label htmlFor="gasto">Spent: </Form.Label>
                                <Form.Control name="gasto" 
                                type="number" 
                                value={this.state.gasto} placeholder="100..."
                                onChange={this.onChangeHandle} />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="recebido">Earned: </Form.Label>
                                <Form.Control name="recebido" 
                                    type="number" 
                                    
                                    value={this.state.recebido} placeholder="100..."
                                    onChange={this.onChangeHandle} />
                            </Col>
                        </Form.Row>
                     

                        <Form.Label htmlFor="outros">Others: </Form.Label>
                        <Form.Control name="outros" 
                            type="text" 
                            value={this.state.outros} placeholder="Others here..."
                            onChange={this.onChangeHandle} />


                        <Button type="submit" variant="success">Add</Button>
                    </Form.Group>
                </Form>
            </Container>
          );
      }
}

export default AddItemPage;