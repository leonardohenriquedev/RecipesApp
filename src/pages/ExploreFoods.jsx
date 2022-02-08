import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/Explore';

export default function ExploreFoods() {
  return (
    <div>
      <Header title="Explore Foods" searchBar={ false } />
      <Explore foods />
      <Footer />
    </div>
  );
}
