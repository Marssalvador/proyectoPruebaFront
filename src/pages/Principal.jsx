import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Principal extends Component {

    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove("apellido", {path: "/"});
        cookies.remove("nombre", {path: "/"});
        cookies.remove("username", {path: "/"});

        window.location.href= './';
    }

    componentDidMount(){
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {

        console.log('id: ' + cookies.get('id'));
        console.log('apellido: ' + cookies.get('apellido'));
        console.log('nombre: ' + cookies.get('nombre'));
        console.log('username: ' + cookies.get('username'));
        
        return (
            <div>
                Principal

                <br />

                <button onClick={() => this.cerrarSesion()}>Cerrar sesión</button>
            
            </div>
        )
    }
}

export default Principal;