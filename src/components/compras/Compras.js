import React from 'react'
import { crearProducto } from '../api/api'
import { FormularioCompra } from './FormularioCompra'

export const Compras = () => {
    const onSubmit = (data) => {
        crearProducto(data)
    }

    return(
        <div className="container">
        <div className="mt-3">
            <h3 className="text-center text-primary">Ingresar Producto</h3>
            <FormularioCompra onSubmit={onSubmit}/>
        </div>
    </div>
    )
}