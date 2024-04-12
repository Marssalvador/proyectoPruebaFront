import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Cookies from 'universal-cookie';

import '../css/Login.css';


const cookies = new Cookies();

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectos: [] 
    };
  }

  cerrarSesion = () => {
    cookies.remove('id', { path: '/' });
    cookies.remove('apellido', { path: '/' });
    cookies.remove('nombre', { path: '/' });
    cookies.remove('username', { path: '/' });

    window.location.href = './';
  }

  componentDidMount() {
    if (!cookies.get('username')) {
      window.location.href = './';
    }

    const proyectos = [
      { id: 1, nombre: 'Proyecto 1', descripcion: 'Descripción del Proyecto 1', cuantia: 10000 },
      { id: 2, nombre: 'Proyecto 2', descripcion: 'Descripción del Proyecto 2', cuantia: 15000 },
      { id: 3, nombre: 'Proyecto 3', descripcion: 'Descripción del Proyecto 3', cuantia: 20000 }
    ];
    this.setState({ proyectos });
  }

  render() {
    return (
      <div className="p-grid p-dir-col principal-container">
        <div className="p-col">
          <Panel header="Proyectos" className="p-mb-3">
            <DataTable value={this.state.proyectos}>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="descripcion" header="Descripción"></Column>
              <Column field="cuantia" header="Cuantía"></Column>
            </DataTable>
          </Panel>
        </div>
        <div className="p-col p-d-flex p-jc-center">
          <Button label="Cerrar sesión" onClick={this.cerrarSesion} className="btn btn-primary" />
        </div>
      </div>
    );
  }
}

export default Principal;
