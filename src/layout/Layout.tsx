import { Suspense, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";
import { CSSProperties } from "react";

const Layout: React.FC = () => {
  const mainWrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainContainerStyle: CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    flex: "1",
    width: "100%",
    position: "relative",
  };

  return (
    <div style={mainWrapper}>
      <Header />
      <main style={mainContainerStyle}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const MemoizedLayout = memo(Layout);

export default MemoizedLayout;
