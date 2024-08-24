import { Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";

const Layout: React.FC = () => {

  const mainContainerStyle = {
    "maxWidth": "1200px",
    "margin": "0 auto",
    "padding": "2rem",
  }

  return (
    <>
      <Header />
      <main className="main-container" style={mainContainerStyle}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

const MemoizedLayout = memo(Layout);

export default MemoizedLayout;
