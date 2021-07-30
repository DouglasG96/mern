import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Button } from 'react-bootstrap';


export const FormularioCategoria = ({categorias, onSubmit, show, handleClose}) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            nombreCategoria: categorias ? categorias.nombreCategoria : '',
            colorAsociado: categorias ? categorias.colorAsociado : ''
        },
    })
    //const form = useRef(null)
    const submitHandler = handleSubmit((data) => {
        if(!data.nombreCategoria.length > 5 && data.nombreCategoria.length < 9) 
        { 
            alert('el nombre debe tener al menos 4 caracteres')
        } 
        else {
            onSubmit(data) 
        };
    })

    const opciones = [
        {
            idColorAsociado: 1,
            nombreColorAsociado: 'Primary'
        },
        {
            idColorAsociado: 2,
            nombreColorAsociado: 'Info'
        },
        {
            idColorAsociado: 3,
            nombreColorAsociado: 'Success'
        },
        {
            idColorAsociado: 4,
            nombreColorAsociado: 'Warning'
        },
        {
            idColorAsociado: 5,
            nombreColorAsociado: 'Danger'
        }
    ]

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={submitHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Categoria</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className="container">
                            <div className="from-group mt-2">
                                <label htmlFor="nombreCategoria" >
                                    Nombre de la categoria: 
                                </label>
                                <input className="form-control" type="text" {...register('nombreCategoria', { required: true })} name="nombreCategoria" id="nombreCategoria" maxLength="9" minLength="5"/>
                            </div>                
                            <div className="form-group mt-2">
                                <label htmlFor="colorAsociado">
                                    Color Asociado: 
                                </label>
                                <select className="form-select" {...register('colorAsociado', { required: true })} name="colorAsociado" id="colorAsociado">
                                {
                                    opciones.map((indice, i) => (
                                        <option key={i} value={indice.idColorAsociado}> {indice.nombreColorAsociado}</option>
                                    ))
                                }
                                </select>
                            </div>                
                            <div className="form-group mt-3">
                                
                            </div>
                    </div>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <button type="submit" className="btn btn-outline-primary">
                    Guardar categoria
                </button>
            </Modal.Footer>
            </form>
        </Modal>    
    )
}