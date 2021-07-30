import React,{useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { consultarProducto } from '../api/api'
import { getCatergoriasId, getCategorias } from '../api/api'
export const FormularioCompra = ({compras, onSubmit}) => {
    const { register, handleSubmit , setValue } = useForm({})
    const [ categorias  , setCategorias ] = useState([]);
    const [ categoria, setCategoria ] = useState("");  
    const history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            const categorias = await getCategorias()
            setCategorias(categorias)
        }
        fetchData()
    },[])

    const submitHandler = handleSubmit((data) => {
        onSubmit(data)
        history.push('/Inventario')
    }) 
    const validarExistencia = (data) => {        
        if(data.target.value.length > 3)
        {
            consultarProducto(data.target.value).then((response) => {
                if(response.length > 0)
                {
                    console.log('existe',response)
                    const {idCategoria} = response[0]
                    getCatergoriasId(idCategoria).then((response) => {
                        setCategoria( 
                            response._id
                        );
                    }).catch((error) => {
                        console.log(error)
                    });
                }
                else
                {
                    console.log('no existe')
                    setCategoria(0);
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const changeCategoria = (event) => {
        setCategoria(event.target.value) 
        setValue('idCategoria',  event.target.value); 
    }

    return (

            <form onSubmit={submitHandler}>
                <div className="from-group">
                    <label htmlFor="nombreProducto">
                        Nombre del Producto: 
                    </label>
                    <input className="form-control" type="text" {...register('nombreProducto', { required: true })} name="nombreProducto" id="nombreProducto" onKeyUp={validarExistencia} autoComplete="off"/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="idCategoria">
                        Categoria: 
                    </label>
                    <select className="form-control" onChange={(event)=>{ changeCategoria(event)  }} {...register('idCategoria')}  name = "idCategoria" id="idCategoria">
                        <option value="0">Seleccione una categoria..</option>
                        {
                            categorias.map((c,i) => (
                                <option key={i} value={c._id} >{c.nombreCategoria}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="cantidadUnidades">
                        Cantidad de unidades: 
                    </label>
                    <input className="form-control" name="cantidadUnidades" id="cantidadUnidades" {...register('cantidadUnidades', { required: true })}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="costoUnitario">
                        Costo Unitario:
                    </label>
                    <input className="form-control" name="costoUnitario" id="costoUnitario" {...register('costoUnitario', { required: true })} />
                </div>
                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-outline-primary">
                        Guardar
                    </button>
                </div>
            </form>
    )
}