//Categorias
export const getCategorias = () => fetch(`http://localhost:4000/Categorias`).then(response => response.json())

export const crearCategoria = (categoria) => fetch(`http://localhost:4000/Categorias/crearCategoria`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
})

export const editarCategoria = (categoria, id) => fetch(`http://localhost:4000/Categorias/${id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(categoria)
})

export const getCatergoriasId = (id) => fetch(`http://localhost:4000/Categorias/${id}`).then(res => res.json())

// Productos    
export const consultarProducto = (nombreProducto) => fetch(`http://localhost:4000/Productos/consultarProducto`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nombreProducto})
}).then(res => res.json())

export const crearProducto = (producto) => fetch(`http://localhost:4000/Productos/crearProducto`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
})

export const getProductos = () => fetch(`http://localhost:4000/Productos`).then(response => response.json())
export const getProductosId = (id) => fetch(`http://localhost:4000/Productos/${id}`).then(res => res.json())