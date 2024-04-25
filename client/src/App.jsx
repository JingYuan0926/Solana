import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';

import { Home, Payment, Portfolio, Marketplace } from './pages';
import React from 'react';

const App = () => {
  return (
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Routes>
            </main>
            <Footer />
          </div>
  )
}

export default App;