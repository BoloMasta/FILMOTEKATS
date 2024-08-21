import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "./layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage"));

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Filmoteka</title>
        <meta name="description" content="Aplikacja do zarządzania własnymi filmami" />
        <meta name="keywords" content="filmoteka, filmy, katalog, zarządzanie" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
