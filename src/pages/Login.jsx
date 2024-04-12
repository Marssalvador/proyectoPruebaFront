import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

import { Button } from 'primereact/button';

const baseUrl = "http://localhost:4000/usuarios";
const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: ''
            }
        };
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    };

    iniciarSesion = async () => {
        await axios.get(baseUrl, {
            params: {
                username: this.state.form.username,
                password: md5(this.state.form.password)
            }
        })
            .then(response => {
                return response.data;
            })
            .then(response => {
                if (response.length > 0) {
                    var respuesta = response[0];
                    cookies.set('id', respuesta.id, { path: "/" });
                    cookies.set('apellido', respuesta.apellido, { path: "/" });
                    cookies.set('nombre', respuesta.nombre, { path: "/" });
                    cookies.set('username', respuesta.username, { path: "/" });

                    alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido}`);

                    window.location.href = "./principal";
                } else {
                    alert('El usuario o la contraseña no son correctos');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    componentDidMount() {
        if (cookies.get('username')) {
            window.location.href = "./principal";
        }
    }


    render() {
        return (
            <div>
                <h1 className="text-4xl font-bold text-center text-blue-500 mt-10 pb-2 border-b-2 border-blue-500">
                Bienvenido a la demo
                </h1>                
                <div className="containerPrincipal" style={{ border: '2px solid #1976D2', padding: '20px', borderRadius: '5px' }}>
                    <div className="containerSecundario">
                        <div className="form-group">
                            <label>Usuario: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.handleChange}
                            />
                            <br />
                            <label>Contraseña: </label>
                            <br />
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.handleChange}
                            />
                            <br />
                            <Button label="Iniciar sesión" onClick={this.iniciarSesion} className="p-button-primary" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
