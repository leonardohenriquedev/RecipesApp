import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Ingredients from '../components/Ingredients';

export default function ExploreFoodsIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" searchBar={ false } />
      <Ingredients foods />
      <Footer />
    </div>
  );
}
