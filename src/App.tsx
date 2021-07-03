import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navigation from './layouts/Navigation';
import TopPage from './pages/TopPage';
import CategoryNavigationPage from './pages/CategoryNavigation';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import AppContainer from './layouts/AppContainer';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Switch>
          <Route path='/products/:id'>
            <SingleProductPage />
          </Route>
          <Route path='/collections' exact>
            <CategoryNavigationPage />
          </Route>
          <Route path='/collections/:id'>
            <ProductsPage />
          </Route>
          <Route path='/checkout'>
            <CheckoutPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/reviews'>
            <ReviewPage />
          </Route>
          <Route path='/' exact>
            <TopPage />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
