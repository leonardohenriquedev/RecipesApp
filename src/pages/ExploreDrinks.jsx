import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/Explore';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" searchBar={ false } />
      <Explore drinks />
      <Footer />
    </div>
  );
}
