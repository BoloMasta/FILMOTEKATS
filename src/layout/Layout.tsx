import { Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <Footer />
      </main>
    </>
  );
};

const MemoizedLayout = memo(Layout);

export default MemoizedLayout;
