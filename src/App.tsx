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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Filmoteka</title>

        <meta name="description" content="Aplikacja do zarządzania własnymi filmami" />
        <meta name="keywords" content="filmoteka, filmy, katalog, zarządzanie" />

        <link rel="icon" type="image/x-icon" href="/images/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="./images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
