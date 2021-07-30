import React, {useState, useEffect } from 'react'
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { FormularioCategoria } from './FormularioCategoria';
import { getCategorias } from '../api/api'
import { crearCategoria } from '../api/api'

export const Categorias = () => {
    const [show, setShow] = useState(false);
    const history = useHistory()
    const [ items, setItems ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const categorias = await getCategorias()
            setItems(categorias)
        }
        fetchData()
    },[])
    //Modal events
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit =  async (data) => {
        await crearCategoria(data)
        history.push('/')
    }

    const validarClaseColor = (idColorAsociado) => {
        switch (idColorAsociado) {
            case 1:
                return "primary";
            case 2:
                return "info";
            case 3:
                return "success";
            case 4:
                return "warning";
            case 5:
                return "danger";
            default:
        }
    }
    

    return (
        <div className="container">
            <div className="mt-3">
                <h3 className="text-primary text-center">Categorias de Productos</h3>
                <div className="form-group mt-3">
                <Button variant="primary" onClick={handleShow}>
                    Agregar Categoria
                </Button>

                    </div>
                <table className="table table-striped mt-4  table-bordered ">
                    <thead>
                        <tr className="bg-secondary  text-white ">
                            <th>Nombre de Categoria</th>
                            <th>Color Asociado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(indice => (
                                <tr key={indice._id}>
                                    <td>{indice.nombreCategoria}</td>
                                    <td>
                                        <span className={`badge bg-${validarClaseColor(indice.colorAsociado)}` }>{validarClaseColor(indice.colorAsociado)}</span>
                                    </td>
                                    {
                                        /*
                                        <td className="text-center">
                                        <Link to={`/EditarCategorias/${indice._id}`}
                                        className="btn btn-outline-success"
                                        >Editar</Link></td>
                                        */
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                    <FormularioCategoria show={show} handleClose={handleClose} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}