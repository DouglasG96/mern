import './App.css';
import { NavLink, Route, Switch  , Redirect} from 'react-router-dom';
import { Categorias } from './components/categorias/Categorias';
import { EditarCategorias } from './components/categorias/EditarCategorias';
import { CrearCategorias } from './components/categorias/CrearCategorias';
import { Inventario } from './components/inventario/Inventario';
import { Compras } from './components/compras/Compras';
import { Ventas } from './components/ventas/Ventas';
function App() {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg navbar=light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <NavLink 
            to="/categorias"            
            activeStyle={{
              fontWeight: "bold"              
            }}
             className="nav-link text-white">Categorias</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/Inventario" 
            activeStyle={{
              fontWeight: "bold"              
            }}
            className="nav-link text-white  ">Inventario</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/Compras"
            activeStyle={{
              fontWeight: "bold"              
            }}
             className="nav-link text-white  ">Compras</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/Ventas" 
            activeStyle={{
              fontWeight: "bold"              
            }}
            className="nav-link  text-white ">Ventas</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/categorias" component={Categorias} />
        <Route exact path="/EditarCategorias/:id" component={EditarCategorias} />
        <Route exact path="/CrearCategorias" component={CrearCategorias} />
        <Route exact path="/Inventario" component={Inventario} />
        <Route exact path="/Compras" component={Compras} />
        <Route exact path="/Ventas" component={Ventas} />
        <Redirect to="/categorias" />


      </Switch>
    </div>

  );
}

export default App;
