const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Categorias = require('./models/Categorias');
const Productos = require('./models/Productos');

mongoose.connect('mongodb://127.0.0.1:27017/mern', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('conexion establecida correctamente');
});
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/Categorias', (req, res) => {
    Categorias.find((err, categorias) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(categorias);
        }
    })
})

app.post('/Categorias/crearCategoria', (req, res) => {
    const nuevaCategoria = new Categorias(req.body);
    nuevaCategoria.save()
    .then((nuevaCategoria) => {
        res.json(nuevaCategoria);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
})

app.get('/Categorias/:id', (req, res) => {
    const id = req.params.id;
    Categorias.findById(id, (err, categoria) => {
        res.json(categoria);
    })
})

//Productos

app.get('/Productos', (req, res) => {
    Productos.find((err, productos) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(productos);
        }
    })
})

app.get('/Productos/:id', (req, res) => {
    const id = req.params.id;
    Productos.find({idCategoria: id}, (err, productos) => {
    }).then((productos) => {
        res.json(productos);
    }).catch((err) => {
        res.status(404).send({});
    })
})

app.post('/Productos/consultarProducto', (req, res) => {
    const nombreProducto = req.body.nombreProducto;
    Productos.find({nombreProducto: { $regex: '.*' + nombreProducto + '.*' }}, (err, productos) => {
    }).then((productos) => {
        res.json(productos);
    }).catch((err) => {
        res.status(404).send({});
    })
})

app.post('/Productos/crearProducto', (req, res) => {
    const nuevaProducto = new Productos(req.body);
    nuevaProducto.save()
    .then((nuevaProducto) => {
        res.json(nuevaProducto);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});