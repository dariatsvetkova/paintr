import React from 'react';
import Header from './Header';
import HowTo from './HowTo';
import Generator from './Generator';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <HowTo />
        <Generator />
      </main>
      <Footer />
    </>
  );
}

export default App;
