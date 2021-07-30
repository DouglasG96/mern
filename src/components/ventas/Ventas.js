import React,{useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCatergoriasId,getCategorias } from '../api/api'
import { getProductos, consultarProducto } from '../api/api'
import { Modal, Button } from 'react-bootstrap';

export const Ventas = () => {
    const { register } = useForm({})
    const [ productos, setProductos ] = useState([])
    const [ categorias  , setCategorias ] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(() => {
        const fetchData = async () => {
            const categorias = await getCategorias()
            setCategorias(categorias)
        }
        fetchData()

        const fetchDataProductos = async () => {
            const productos = await getProductos()
            setProductos(productos)
        }
        fetchDataProductos()
        
    },[])

    const validarExistencia = (data) => {        
        if(data.target.value.length > 3)
        {
            consultarProducto(data.target.value).then((response) => {
                console.log('existe',response)
                /*
                productos.filter(item=>{
                    if(item.nombreProducto.toString().includes(data.target.value) ||
                    item.nombreProducto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(data.target.value) ||
                    item.nombreProducto.toLowerCase().includes(data.target.value)
                    ){
                        console.log(item)
                        setProductos({...item})
                    }
                })
                */
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const changeCategoria = (event) => {
        console.log(event.target.value)
    }


    const validarColorFondo = (cantidad) => {
        if(cantidad === 0){
            return "red"
        }
    }

    const validarClaseColor = (idCategoria) => {
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
    }
    return <div className="container">
            <div className="mt-3">
                <h3 className="text-primary text-center"  >Venta de Productos</h3>

                <div className="from-group">
                    <label htmlFor="nombreProducto">
                        Nombre del Producto: 
                    </label>
                    <input className="form-control" type="text" name="nombreProducto" id="nombreProducto" onKeyUp={validarExistencia} autoComplete="off"/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="idCategoria">
                        Categoria: 
                    </label>
                    <select className="form-control" onChange={(event)=>{ changeCategoria(event)  }}  name = "idCategoria" id="idCategoria">
                        <option value="0">Seleccione una categoria..</option>
                        {
                            categorias.map((c,i) => (
                                <option key={i} value={c._id} onClick={handleShow} >{c.nombreCategoria}</option>
                            ))
                        }
                    </select>
                </div>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Categoria</th>
                            <th>Existencia</th>
                            <th>Precio de Venta Actual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((p,i) => ( 
                                <tr key={p._id}>
                                    <td>{p.nombreProducto}</td>
                                <td>
                                    <span className={`badge bg-${validarClaseColor(p.idCategoria)}` }>{validarClaseColor(p.idCategoria)}</span>
                                </td>
                                <td style={{backgroundColor: `${validarColorFondo(p.cantidadUnidades)}`}} >{p.cantidadUnidades}</td>
                                <td>$ {p.costoUnitario * 0.20}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Formulario de Venta</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary">Vender</Button>
                        </Modal.Footer>
                 </Modal>
            </div>
        </div>
}