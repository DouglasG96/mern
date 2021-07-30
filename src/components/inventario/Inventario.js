import React, {useState, useEffect } from 'react'
import { getCategorias, getProductosId, getCatergoriasId } from '../api/api'
import { getProductos } from '../api/api'

export const Inventario = () => {
    const [ items, setItems ] = useState([])
    const [ productos, setProductos ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const categorias = await getCategorias()
            setItems(categorias)
        }
        fetchData()

        const fetchDataProductos = async () => {
            const productos = await getProductos()
            setProductos(productos)
        }
        fetchDataProductos()
    },[])

    const filtrarPorCategoria = (categoria) => {
        const fetchDataFiltrada = async () => {
            const productosFiltrados = await getProductosId(categoria._id)
            setItems(productosFiltrados)
        }
        fetchDataFiltrada()
    }

    const validarColorFondo = (cantidad) => {
            if(cantidad < 100){
                return "red"
            }
            else if (cantidad >=100 && cantidad < 200)
            {
                return "orange";
            }
    }
    const validarClaseColor = (idCategoria) => {
        console.log(idCategoria)
        /*
        const fetchDataCategoriasId = async () => {
            const categoriasId = await getCatergoriasId(idCategoria)
            switch (categoriasId.idColorAsociado) {
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
        fetchDataCategoriasId()
        */
    }
    
    return <div className="container">
            <div className="mt-3">
                <h3  className="text-center text-primary"  >Inventario</h3>
                <div className="form-group">
                    <label className="form-label">
                        Filtrar por categoría: 
                    </label>
                    <select className="form-select" onChange={filtrarPorCategoria}>
                        <option value="0">Todas...</option>
                        {
                            items.map((indice,i) => (
                                <option key={i} value={indice._id} >{indice.nombreCategoria}</option>
                            ))
                        }
                    </select>
                </div>
                <table className="table table-striped mt-4">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Categoria</th>
                            <th>Cantidad</th>
                            <th>Costo Unitario Promedio</th>
                            <th>Precio de Venta Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        productos.map(indice => (
                            <tr key={indice._id}>
                                <td>{indice.nombreProducto}</td>
                                <td>
                                    <span className={`badge bg-${validarClaseColor(indice.idCategoria)}` }>{validarClaseColor(indice.idCategoria)}</span>
                                </td>
                                <td style={{backgroundColor: `${validarColorFondo(indice.cantidadUnidades)}`}} >{indice.cantidadUnidades}</td>
                                <td>$ {indice.costoUnitario}</td>
                                <td>$ {indice.costoUnitario * 0.20}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
}