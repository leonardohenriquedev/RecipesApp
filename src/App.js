import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

import Provider from './context/Provider';
import NotFound from './pages/NotFound';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import ExploreFoods from './pages/ExploreFoods';
import FoodDetails from './pages/FoodDetails';
import DrinksDetails from './pages/DrinksDetails';
import FoodProgress from './pages/FoodProgress';
import DrinksProgress from './pages/DrinksProgress';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationality from './pages/ExploreFoodsNationality';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />

        <Route
          exact
          path="/foods/:id"
          render={ (props) => <FoodDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <DrinksDetails { ...props } /> }
        />
        <Route
          path="/foods/:id/in-progress"
          render={ (props) => <FoodProgress { ...props } /> }
        />
        <Route
          path="/drinks/:id/in-progress"
          render={ (props) => <DrinksProgress { ...props } /> }
        />

        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />

        <Route
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationality }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
