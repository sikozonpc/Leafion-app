import React from "react";

import Modal from "../Modal/Modal";

import classes from "./AddItemPage.module.css";


class AddItemPage extends React.Component {
    state = {
        mes: "jan",
        nome: "",
        descricao: "",
        dia: "",
        gasto: 0,
        recebido: 0 ,
        outros: "",
        dosier: "",
        responseToPost: null,
        errors: {},
        show: false
    }

    // TODO:
    handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        // Nome
        if(!this.state.nome){
            formIsValid = false;
            errors["nome"] = "vazio";
            console.log("name error")
        }
        
         this.setState({errors: errors})
         console.log(formIsValid);
    
         return formIsValid;
    }

    onChangeHandle = (e) =>{
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }
    
    hideModal = () => {
        this.setState({show: false })
        window.location.reload();
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
                "dia": this.state.dia,
                "mes": this.state.mes,
                "dosier": this.state.dosier,
                "nome": this.state.nome,
                "descricao": this.state.descricao, 
                "gasto": this.state.gasto,
                "recebido": this.state.recebido,
                "outros": this.state.outros
                 } }),
            }).then(e => this.setState({responseToPost: e.text().then(e =>"ele" + console.log(e) )}) );
        } else {
            alert("Alguns campos devem estar mal escritos!");
        } 
      }

      
      render(){
          return(
              <>
              {this.state.show ? <Modal show={this.state.show} clicked={this.hideModal}>
                    <h2>Action Added !</h2>
                    <p>To <strong>{this.state.dosier}</strong> dosier.</p>
                    <ul>
                        <li>Name: <strong></strong>{this.state.nome}</li>
                        <li>Descripton: <strong>{this.state.descricao}</strong></li>
                        <li>Date: <strong>{this.state.dia}/{this.state.mes}/2019</strong></li>
                        <li>Spent: <strong>{this.state.gasto} €</strong></li>
                        <li>Earn: <strong>{this.state.recebido} €</strong></li>
                        <li>Others: <strong>{this.state.outros}</strong></li>
                    </ul>
                    <button 
                        onClick={this.hideModal}
                        className={classes.BtnInverted}>Continue</button>
                </Modal> : null}
                

                <form onSubmit={this.submitHandler} className={classes.Form}>
                    <label htmlFor="dia">Dia</label>
                        <input name="dia"
                             
                            type="text" 
                            value={this.state.dia} placeholder="dia"
                            onChange={this.onChangeHandle} />

                    <label htmlor="mes">Mês</label>
                    <select name="mes" 
                         value={this.state.mes} onChange={this.onChangeHandle}>
                        <option value="jan">Janeiro</option>
                        <option value="feb">Fevereiro</option>
                        <option value="mar">Março</option>
                        <option value="mai">Maio</option>
                        <option value="apr">Abril</option>
                        <option value="jun">Junho</option>
                        <option value="jul">Julho</option>
                        <option value="aug">Agosto</option>
                        <option value="sep">Setembro</option>
                        <option value="oct">Octubro</option>
                        <option value="nov">Novembro</option>
                        <option value="dec">Dezembro</option>
                    </select>


                    <label htmlFor="dosier">Dosier</label>
                    <div className="container-input-with-suffix">
                        <input name="dosier" 
                            type="text" 
                            
                            value={this.state.dosier}
                            onChange={this.onChangeHandle} />
                    </div>
            
                    <label htmlFor="nome">Nome da Ação/ Produto</label>
                    <input name="nome" 
                        type="text" 
                        value={this.state.nome} placeholder="Escrever..."
                        onChange={this.onChangeHandle}/>
    

                    <label htmlFor="descricao">Descrição</label>
                    <input name="descricao" 
                        type="text" 
                        value={this.state.descricao} placeholder="Escrever..."
                        onChange={this.onChangeHandle} />

                    <label htmlFor="gasto">Gasto</label>
                    <div className="container-input-with-suffix">
                        <input name="gasto" 
                            type="number" 
                            
                            value={this.state.gasto} placeholder="100..."
                            onChange={this.onChangeHandle} />
                        <span>€</span>
                    </div>

                    <label htmlFor="recebido">Recebido</label>
                    <div className="container-input-with-suffix">
                        <input name="recebido" 
                            type="number" 
                            
                            value={this.state.recebido} placeholder="100..."
                            onChange={this.onChangeHandle} />
                        <span>€</span>
                    </div>

                    <label htmlFor="outros">Outros</label>
                    <input name="outros" 
                        type="text" 
                        value={this.state.outros} placeholder="Escever..."
                        onChange={this.onChangeHandle} />
                    
                    <button type="submit" className={classes.BtnInverted}>Add</button>
                </form>
            </>
          );
      }
}

export default AddItemPage;