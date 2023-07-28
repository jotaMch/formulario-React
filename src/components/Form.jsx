import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: {
                value: "",
                isError: false,
                isValid: false
            },
            idade: {
                value: "",
            },
            genero: {
                value: "",
            },
            estadoCivil: {
                value: "",
            },
            tipoDocumento: {
                value: "rg", // valor padrão para o tipo de documento
            },
            loadingVisible: false,
            formularioEnviado: false,
            dadosFormulariosEnviados: [], // Array para armazenar os dados de todos os formulários enviados


        }
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: {
                value,
            },
        });
    };

    handleChangeGender = (event) => {
        const { value } = event.target;
        this.setState({
            genero: value,
        });
    };
    
    
    


    handleSubmit = (event) => {
        event.preventDefault();
    
        // acessar os valores dos campos no estado do componente
        const { nome, idade, genero, estadoCivil, tipoDocumento } = this.state;
        const dadosFormulario = {
            nome: nome.value,
            idade: idade.value,
            genero: genero,
            estadoCivil: estadoCivil.value,
            tipoDocumento: tipoDocumento.value,
        };

        this.setState({ loadingVisible: true });
        setTimeout(() => {
            this.setState((prevState) => ({
                dadosFormulariosEnviados: [...prevState.dadosFormulariosEnviados, dadosFormulario],
    
                loadingVisible: false,
                formularioEnviado: true,
                dadosFormulario,
    
                nome: { value: "" },
                idade: { value: "" },
                genero: "", // valor do gênero como uma string vazia
                estadoCivil: { value: "" },
                tipoDocumento: { value: "rg" },
            }));
            
    }, 2000);
    

    };
    
    

    render() {
        return(
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                <h3>Dados</h3>
                    <label>Nome:</label>
                    <input type="text" value={this.state.nome.value} name="nome" 
                    onChange={this.handleChange}/>
                    {this.state.cpf.value.length === 0 &&
                    <p>O nome é obrigatório</p>}
                    {this.state.cpf.isError &&
                    <p>O nome está incompleto</p>}

                    <label>Idade:</label>
                    <input type="number" value={this.state.idade.value} name="idade"
                    onChange={this.handleChange}/>

                    <label>Genero:</label>   
                    
                        <div>
                            <input 
                            type="radio" 
                            name="genero"
                            value="Masculino" 
                            id="masculino" 
                            onChange={this.handleChangeGender}
                            />
                            <label>Masculino</label>
                        </div> 

                        <div>
                            <input 
                            type="radio" 
                            name="genero" 
                            value="feminino" 
                            id="feminino"
                            onChange={this.handleChangeGender}

                            />
                            <label>Feminino</label>
                        </div> 

                        <div>
                            <input 
                            type="radio" 
                            name="genero" 
                            value="outro" 
                            id="outro"
                            onChange={this.handleChangeGender}

                            />
                            <label>Outro</label>
                        </div> 


                    <label htmlFor="estadoCivil">Estado Civil:</label>

                    <select 
                    name="estadoCivil"
                    value={this.state.estadoCivil.value}
                    id="estadoCivil" 
                    onChange={this.handleChange}
                    >


                        <option>Selecione</option>
                        <option value="solteiro">Solteiro(a)</option>
                        <option value="casado">Casado(a)</option>
                        <option value="divorciado">Divorciado(a)</option>
                        <option value="viuvo">Viúvo(a)</option>  


                    </select>


                    <div>
                        
                        <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                        
                        <select
                        value={this.state.tipoDocumento.value}
                        onChange={this.handleChange}
                        name="tipoDocumento" 
                        id="tipoDocumento">
                            <option value="rg">RG</option>
                            <option value="cpf">CPF</option>
                            <option value="passaporte">CNPJ</option>
                        </select>

                    </div>

                    <button type="submit">Enviar</button>

                </form>

                {this.state.loadingVisible && <div className="loading"></div>}

        {this.state.dadosFormulariosEnviados.length > 0 && (
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Genero</th>
                    <th>Estado civil</th>
                    <th>Documento</th>
                </tr>
                </thead>
                <tbody>
                {this.state.dadosFormulariosEnviados.map((formulario, index) => (
                    <tr key={`${formulario.nome}-${formulario.idade}`}>

                        <td>{formulario.nome}</td>
                        <td>{formulario.idade}</td>
                        <td>{formulario.genero}</td>
                        <td>{formulario.estadoCivil}</td>
                        <td>{formulario.tipoDocumento}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
        );
    }
}

export default Form;