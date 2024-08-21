import { Suspense } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";

const Layout: React.FC = ({ children }) => {
    return (
        <>
        <Header />
        <main className="main-container">
            <Suspense fallback={<Loader />}>
                {children}
            </Suspense>
            <Footer />
        </main>
        </>
    );
};

export default Layout;
