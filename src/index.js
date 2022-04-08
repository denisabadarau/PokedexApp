import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { PokemonsStoreProvider } from './store/pokemonsStore';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';

import './index.css';

const Home = lazy(() => import('./pages/Home/Home'));
const Pokemon = lazy(() => import('./pages/Pokemon/Pokemon'));
const Error = lazy(() => import('./pages/Error/Error'));


ReactDOM.render(
  <React.StrictMode>
    <PokemonsStoreProvider>
      <BrowserRouter>
        <Layout>
          <ChakraProvider>
            <Suspense fallback={<Spinner size="xl" />}>
              <Routes>
                <Route
                  exact path="/"
                  element={<Home />}
                />
                <Route
                  path="/pokemon"
                  element={<Home />}
                />
                <Route
                  path="/pokemon/:pokemonId"
                  element={<Pokemon />}
                />
                <Route
                  path="*"
                  element={<Error />}
                />
              </Routes>
            </Suspense>
          </ChakraProvider>
        </Layout>
      </BrowserRouter>
    </PokemonsStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);