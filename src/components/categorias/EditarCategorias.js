import React, {useState, useEffect} from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { editarCategoria, getCatergoriasId } from '../api/api'
import { FormularioCategoria } from './FormularioCategoria'

export const EditarCategorias = () => {
    const match = useRouteMatch()
    const [categorias, setCategorias] = useState()
    const history = useHistory()
  
    useEffect(() => {
       const fetchCategorias = async () => {
           const categorias = await getCatergoriasId(match.params.id)
           setCategorias(categorias)           
       }
       fetchCategorias()
    },[])

    const onSubmit = async (data) => {
        await editarCategoria(data, match.params.id)
        history.push("/")
    }
    return categorias ? (
        <div className="container">
            <div className="mt-3">
                <h3 class="text-center text-primary">Editar Categorias</h3>
                <FormularioCategoria categorias={categorias} onSubmit={onSubmit} /> 
            </div> 
        </div>
        ):
        (
            <div>Loading...</div>
        )    
}