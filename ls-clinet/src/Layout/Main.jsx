import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../page/Home/NavBar";
import Footer from "../page/Home/Footer";


const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login')
    return (
        <div>
           {noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeaderFooter ||<Footer></Footer>}
        </div>
    );
};

export default Main;