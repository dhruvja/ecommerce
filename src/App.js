import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/single" component={SingleProduct} />
          <Route path="/products" component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
